import { max } from "underscore";
import RelineGraphUtil from "../utils/RelineGraphUtil";
import { RelineGraphSchema } from "../interfaces/graph.relineSchema";
import { RelineEdgeSchema } from "../interfaces/edge.relineSchema";

import LayoutBase from "./LayoutBase";
// import RelineNodeUtil from "../utils/RelineNodeUtil";

import {
    MIN_WIDTH,
    FONT_SIZE,
    NODE_RECT_SHRINK_PARA,
} from "../../../assets/constants";

interface TreeNode {
    id:string,
    children:TreeNode[],
    mainAx?:number,
    subAx?:number,
    halfLength:number,
}
function createTreeNode(id:string, halfLength:number) {
    return {
        id,
        children: [],
        halfLength,
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
        const node = RelineGraphUtil.getElementById(graph, edge.target);
        const nodeText:string = <string>node?.metadata.basic.label;
        const nodeLabelLength = nodeText.length || 0;
        const halfLength = Math.max(FONT_SIZE * nodeLabelLength * NODE_RECT_SHRINK_PARA, MIN_WIDTH);
        _toTree(graph, createTreeNode(edge.target, halfLength), curNode);
    }
    return curNode;
}

function toTree(graph:RelineGraphSchema) :TreeNode|undefined {
    // TODO: 处理非树问题
    const rootNode = RelineGraphUtil.getElementById(graph, "");
    if (rootNode) {
        const nodeText:string = <string>rootNode?.metadata.basic.label;
        const nodeLabelLength = nodeText.length || 0;
        const halfLength = Math.max(nodeLabelLength * FONT_SIZE, MIN_WIDTH);
        const curNode = _toTree(graph, createTreeNode(rootNode.id, halfLength), undefined);
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
    mainAxPos:number,
    subAxSEP:number,
    leaves:string[],
    depth:number,
    treeDepth:number,
    mainAxSEP:number,
) {
    /*
        do a another DFS, using:
        gapOfSubAx = subAxLen / number of leaf
        subAxOfLeaf = leafOrder * gapOfSubAx
        subAxOfNonLeaf = average(subAxOfChildren)
        mainAxOfNode = mainAxLen / depth_of_root * depth_of_node
        to calculate the coordinate of node
    */
    const mainAxCurPos = mainAxPos + mainAxSEP + tree.halfLength;
    if (tree.children.length === 0) {
        // 当前排头线+主轴间距+文本半长
        tree.mainAx = mainAxCurPos;
        tree.subAx = subAxSEP * leaves.indexOf(tree.id);
    } else {
        for (const child of tree.children) {
            _hierarchyLayout(
                child,
                mainAxCurPos + tree.halfLength,
                subAxSEP,
                leaves,
                depth + 1,
                treeDepth,
                mainAxSEP,
            );
        }
        tree.mainAx = mainAxCurPos;
        tree.subAx = averageSubAx(tree.children);
    }
}
function hierarchyLayout(
    tree:TreeNode,
    options:any,
) {
    const {
        subAxSEP,
        mainAxSEP,
    } = options;
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
    _hierarchyLayout(tree, 0, subAxSEP, leaves, 0, treeDepth, mainAxSEP);
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

class LayoutHierarchy extends LayoutBase {
    run(graph:RelineGraphSchema):RelineGraphSchema|undefined {
        let tree = toTree(graph);
        // console.log(tree);
        if (tree) {
            tree = hierarchyLayout(tree, this.options);
            // console.log(tree);
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

export default LayoutHierarchy;

/*
const graph = RelineGraphUtil.create("0", { strict: true });
if (graph) {
    const node1 = RelineNodeUtil.create("asd", { strict: true });
    if (node1) {
        RelineNodeUtil.updateField(node1, "basic", {
            id: node1.id,
            label: "",
        }, { strict: true });
        RelineGraphUtil.insertNode(graph, node1, { strict: true }, "");
        const node2 = RelineNodeUtil.create("2", { strict: true });
        if (node2) {
            RelineGraphUtil.insertNode(graph, node2, { strict: true }, node1.id);
            RelineNodeUtil.updateField(node2, "basic", {
                id: node1.id,
                label: "dsfsdf",
            }, { strict: true });
        }
    }
}

const layout = new LayoutHierarchy({
    mainAxSEP: 0,
    subAxSEP: 1.5 * TEXT_HEIGHT,
    offsetX: 0,
    offsetY: 0,
});
let layoutGraph = null;
if (graph) {
    layoutGraph = layout.run(graph);
}
console.log(graph);
console.log(JSON.stringify(layoutGraph, null, 4));
*/
