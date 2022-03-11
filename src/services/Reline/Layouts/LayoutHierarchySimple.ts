import { max } from "underscore";
import RelineGraphUtil from "../utils/RelineGraphUtil";
import { RelineGraphSchema } from "../interfaces/graph.relineSchema";
import { RelineEdgeSchema } from "../interfaces/edge.relineSchema";

import LayoutBase from "./LayoutBase";

interface TreeNode {
    id:string,
    children:TreeNode[],
    mainAx?:number,
    subAx?:number,
}
function createTreeNode(id:string) {
    return {
        id,
        children: [],
    };
}
function insertNode(curNode:TreeNode, parentNode:TreeNode|undefined) {
    if (parentNode) {
        (<TreeNode>parentNode).children.push(curNode);
    }
    return curNode;
}

function _toTree(graph:RelineGraphSchema, curNode:TreeNode, parentNode:TreeNode|undefined) {
    insertNode(curNode, parentNode);
    const edges:RelineEdgeSchema[] = RelineGraphUtil.outgoers(graph, curNode.id);
    for (const edge of edges) {
        _toTree(graph, createTreeNode(edge.target), curNode);
    }
    return curNode;
}

function toTree(graph:RelineGraphSchema) :TreeNode|undefined {
    // TODO: 处理非树问题
    const rootNode = RelineGraphUtil.getElementById(graph, "");
    if (rootNode) {
        const curNode = _toTree(graph, createTreeNode(rootNode.id), undefined);
        return curNode;
    }
    return undefined;
}

function getLeaves(tree:TreeNode, leaves:string[]) {
    if (tree.children.length === 0) {
        leaves.push(tree.id);
    } else {
        for (const child of tree.children) {
            getLeaves(child, leaves);
        }
    }
}
function getLeavesDepth(tree:TreeNode, depth:number, leaves:number[]) {
    if (tree.children.length === 0) {
        leaves.push(depth);
    } else {
        for (const child of tree.children) {
            getLeavesDepth(child, depth + 1, leaves);
        }
    }
    return leaves;
}

function averageSubAx(children:any[]) {
    let sum = 0;
    for (const child of children) {
        sum += child.subAx;
    }
    return sum / children.length;
}
function _hierarchyLayout(
    tree:TreeNode,
    mainAxLen:number,
    subAxLen:number,
    leaves:string[],
    depth:number,
    treeDepth:number,
) {
    /*
        do a another DFS, using:
        gapOfSubAx = subAxLen / number of leaf
        subAxOfLeaf = leafOrder * gapOfSubAx
        subAxOfNonLeaf = average(subAxOfChildren)
        mainAxOfNode = mainAxLen / depth_of_root * depth_of_node
        to calculate the coordinate of node
    */
    if (tree.children.length === 0) {
        tree.mainAx = mainAxLen / treeDepth * depth;
        tree.subAx = subAxLen / leaves.length * leaves.indexOf(tree.id);
    } else {
        for (const child of tree.children) {
            _hierarchyLayout(child, mainAxLen, subAxLen, leaves, depth + 1, treeDepth);
        }
        tree.mainAx = mainAxLen / treeDepth * depth;
        tree.subAx = averageSubAx(tree.children);
    }
}
function hierarchyLayout(tree:TreeNode, mainAxLen:number, subAxLen:number) {
    // do a DFS, get numberOfLeaf and depth of root
    const leaves:string[] = [];
    getLeaves(tree, leaves);
    const treeDepth = max(getLeavesDepth(tree, 0, []));
    /*
        do a another DFS, using:
        gapOfSubAx = subAxLen / number of leaf
        subAxOfLeaf = leafOrder * gapOfSubAx
        subAxOfNonLeaf = average(subAxOfChildren)
        mainAxOfNode = mainAxLen / depth_of_root * depth_of_node
        to calculate the coordinate of node
    */
    _hierarchyLayout(tree, mainAxLen, subAxLen, leaves, 0, treeDepth);
    return tree;
}

function graphNodePosToGraphEdgePos(graph:RelineGraphSchema) {
    const { nodes } = graph;
    for (const edge of graph.edges) {
        if (!edge.metadata.show) {
            edge.metadata.show = {};
        }
        edge.metadata.show.headx = nodes[edge.source].metadata.show.x;
        edge.metadata.show.heady = nodes[edge.source].metadata.show.y;
        edge.metadata.show.tailx = nodes[edge.target].metadata.show.x;
        edge.metadata.show.taily = nodes[edge.target].metadata.show.y;
    }
}
export default class LayoutHierarchySimple extends LayoutBase {
    run(graph:RelineGraphSchema):RelineGraphSchema|undefined {
        let tree = toTree(graph);
        if (tree) {
            tree = hierarchyLayout(tree, this.options.width, this.options.height);
            this.treePosToGraphNodePos(graph, tree);
            graphNodePosToGraphEdgePos(graph);
            return graph;
        }
        return undefined;
    }

    treePosToGraphNodePos(graph:RelineGraphSchema, tree:TreeNode) {
        const { nodes } = graph;
        (<any>nodes[tree.id]).metadata.show = (<any>nodes[tree.id]).metadata.show || {};
        (<any>nodes[tree.id]).metadata.show.x = tree.mainAx + this.options.offsetX;
        (<any>nodes[tree.id]).metadata.show.y = tree.subAx + this.options.offsetY;
        for (const child of tree.children) {
            this.treePosToGraphNodePos(graph, child);
        }
    }
}

/*
const graph = RelineGraphUtil.create("1", { strict: true});
if(graph){
RelineGraphUtil.insertNode(graph,RelineNodeUtil.create('0', {strict:true}),{strict:true},undefined);
    RelineGraphUtil.insertNode(graph,RelineNodeUtil.create('1', {strict:true}),{strict:true},'0');
    RelineGraphUtil.insertNode(graph,RelineNodeUtil.create('2', {strict:true}),{strict:true},'0');
    RelineGraphUtil.insertNode(graph,RelineNodeUtil.create('3', {strict:true}),{strict:true},'1');
    let tree=toTree(graph);
    if(tree){
        tree=hierarchyLayout(tree,1,1);
        treePosToGraphNodePos(graph,tree);
        graphNodePosToGraphEdgePos(graph);
        console.log(JSON.stringify(graph,null,4));
    }
}
*/
