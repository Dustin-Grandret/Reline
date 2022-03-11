/* eslint-disable no-param-reassign */
import RelineElementBaseUtil from "./RelineElementBaseUtil";
import Options from "../../utils/relineOptions";
import { RelineGraphSchema } from "../interfaces/graph.relineSchema";
import { RelineNodeSchema } from "../interfaces/node.relineSchema";
import { RelineEdgeSchema } from "../interfaces/edge.relineSchema";
import RelineNodeUtil from "./RelineNodeUtil";
import RelineEdgeUtil from "./RelineEdgeUtil";

import IdManager from "./IdManager";
import RelineNodeVisitor from "./RelineNodeVisitor";
import RelineValidator from "../RelineValidator";

/**
 * Class RelineGraphUtil represent a util for RelineGraph.
 * @module RelineGraphUtil
 * @namespace RelineGraphUtil
 */
class RelineGraphUtil extends RelineElementBaseUtil {
    /**
     * PARAMETER INMUTABLE
     * Create a new edge with given id. If 'id' is a empty string, return undefined.
     * and throw an exception if options.strict is true.
     * @param {String} id The id of the given elementBase.
     * Invoker should the uniqueness of the id of elementBase.
     * @param {{strict:boolean}} options
     * @returns {RelineElementBaseSchema|undefined}
     * @override
     */
    static create(id: string, options: Options): RelineGraphSchema | undefined {
        const newGraph = <any>RelineElementBaseUtil.create(id, options);
        if (newGraph) {
            newGraph.nodes = {};
            newGraph.edges = [];
            return <RelineGraphSchema>newGraph;
        }
        return undefined;
    }

    /**
     * 此处应该做检查
     * @param graph
     * @param key
     * @param value
     * @returns
     */
    static updateBasic(graph:RelineGraphSchema, key:string, value:any): RelineGraphSchema {
        graph.metadata.basic[key] = value;
        return graph;
    }

    /**
     * 此处应该做检查
     * @param graph
     * @param key
     * @param value
     * @returns
     */
    static updateContributor(
        graph:RelineGraphSchema,
        idx:number,
        key:string,
        value:any,
    ): RelineGraphSchema {
        if (graph.metadata.basic.contributors && graph.metadata.basic.contributors.length > 0) {
            graph.metadata.basic.contributors[idx][key] = value;
        }
        return graph;
    }

    /**
     * @param graph
     */
    static addContributor(
        graph:RelineGraphSchema,
    ) {
        if (!graph.metadata.basic.contributors) {
            graph.metadata.basic.contributors = [];
        }
        graph.metadata.basic.contributors.push({
            description: "",
            email: "",
            name: "",
        });
        return graph;
    }

    static changeElementLabel(graph:RelineGraphSchema, id:string, value:string) {
        const element = this.getElementById(graph, id);
        if (element) {
            RelineElementBaseUtil.changeLabel(element, value);
        }
    }

    /**
     * Determine a graph has a given node(compare with value.
     * BUG:重复节点问题
     * {a} {a,a}相等
     * @param {RelineGraphSchema} graph
     * @param {RelineNodeSchema} node
     * @returns {boolean}
    */
    static hasNode(graph:RelineGraphSchema, node:RelineNodeSchema) :boolean {
        for (const nodeId in graph.nodes) {
            if (RelineNodeUtil.isEqual(graph.nodes[nodeId], node)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Determine a graph has a given node(compare with value)
     * @param graph
     * @param edge
     */
    static hasEdge(graph:RelineGraphSchema, edge:RelineEdgeSchema) :boolean {
        for (const curEdge of graph.edges) {
            if (RelineEdgeUtil.isEqual(curEdge, edge)) {
                return true;
            }
        }
        return false;
    }

    /**
     * PARAMETER INMUTABLE
     * True if elementBase1,elementBase2 have value equality in their metadata(without feild basic).
     * and sources,targets.
     * This function will not do checking for param:elementBase1,elementBase2.
     * Use RelineValidator to verify the parameter(s) before using it.
     * @param {RelineGraphBaseSchema} elementBase1
     * @param {RelineGraphSchema} elementBase2
     * @returns {Boolean}
     * @override
     */
    static isEqual(
        graph1: RelineGraphSchema,
        graph2: RelineGraphSchema,
    ): boolean {
        if (!RelineElementBaseUtil.isEqual(graph1, graph2)) {
            return false;
        }
        for (const nodeId in graph1.nodes) {
            if (!RelineGraphUtil.hasNode(graph2, graph1.nodes[nodeId])) {
                return false;
            }
        }
        for (const nodeId in graph2.nodes) {
            if (!RelineGraphUtil.hasNode(graph1, graph2.nodes[nodeId])) {
                return false;
            }
        }
        for (const curEdge of graph1.edges) {
            if (!RelineGraphUtil.hasEdge(graph2, curEdge)) {
                return false;
            }
        }
        for (const curEdge of graph2.edges) {
            if (!RelineGraphUtil.hasEdge(graph1, curEdge)) {
                return false;
            }
        }
        return true;
    }

    static NODE_NOT_FOUNDED:string = "NODE_NOT_FOUNDED";

    /**
     * insert a node to a given graph
     * @param {RelineGraphSchema} graph
     * @param {RelineNodeSchema} node
     * @returns {RelineGraphSchema}
     */
    static insertNode(
        graph:RelineGraphSchema,
        node:RelineNodeSchema|undefined,
        options:Options,
        parent?:string,
    ) :RelineGraphSchema {
        if (!node && options.strict) {
            throw Error(this.NODE_NOT_FOUNDED);
        } else {
            node = <RelineNodeSchema> node;
            graph.nodes[node.id] = node;
            if (parent) {
                const edge = RelineEdgeUtil.create(IdManager.generateId(), { strict: true });
                if (edge) {
                    RelineEdgeUtil.updateEnds(edge, parent, node.id);
                    RelineGraphUtil.addEdge(graph, edge);
                }
                graph.nodes[node.id].metadata.show = <any>{
                    x: 0,
                    y: 0,
                    root: false,
                };
            } else {
                graph.nodes[node.id].metadata.show = <any>{
                    x: 0,
                    y: 0,
                    root: true,
                };
            }
        }
        return graph;
    }

    static insertNewNodeToNode(
        graph:RelineGraphSchema,
        parentId:string,
    ) :RelineGraphSchema {
        this.insertNode(
            graph,
            RelineNodeUtil.create(
                IdManager.generateId(),
                { strict: true },
            ),
            { strict: true },
            parentId,
        );
        return graph;
    }

    /**
     * delete a node to a given graph with id
     * TODO: 返回被删除的节点更好
     * @param {RelineGraphSchema} graph
     * @param {string} id
     * @returns {RelineGraphSchema}
     */
    static deleteNode(graph:RelineGraphSchema, id: string) :RelineGraphSchema {
        for (const edge of this.outgoers(graph, id)) {
            this.deleteNode(graph, edge.target);
        }

        for (const edge of this.incomers(graph, id)) {
            this.deleteEdge(graph, this.searchEdgeById(graph, edge.id));
        }
        delete graph.nodes[id];
        return graph;
    }

    static getElementById(
        graph: RelineGraphSchema,
        id:string,
    ):RelineNodeSchema|RelineEdgeSchema|undefined {
        if (id === "") {
            const nodeIdArray = Object.keys(graph.nodes);
            for (const nodeId of nodeIdArray) {
                if (graph.nodes[nodeId].metadata.show.root) {
                    return graph.nodes[nodeId];
                }
            }
        }
        if (id in graph.nodes) {
            return graph.nodes[id];
        }
        for (const edge of graph.edges) {
            if (edge.id === id) {
                return edge;
            }
        }
        return undefined;
    }

    static updateNode() {

    }

    static getNode() {

    }

    /**
     * add an edge to a given graph
     * @param {RelineGraphSchema} graph
     * @param {RelineEdgeSchema} edge
     * @returns {RelineGraphSchema}
     */
    static addEdge(graph:RelineGraphSchema, edge:RelineEdgeSchema):RelineGraphSchema {
        edge.metadata.show = {
            headx: 0,
            heady: 0,
            tailx: 0,
            taily: 0,
        };
        graph.edges.push(edge);
        return graph;
    }

    /**
     * Delete edge by index
     * @param graph
     * @param idx TODO:检查idx是否大于0小于数组长度
     */
    static deleteEdge(graph:RelineGraphSchema, idx:number): RelineGraphSchema {
        graph.edges.splice(idx, 1);
        return graph;
    }

    static updateEdge(graph:RelineGraphSchema, idx:number, edge:RelineEdgeSchema) {
        graph.edges[idx] = edge;
        return graph;
    }

    static getEdge(graph:RelineGraphSchema, idx:number) {
        return graph.edges[idx];
    }

    static outgoers(graph:RelineGraphSchema, nodeId:String) {
        const result = [];
        for (let idx = 0; idx < graph.edges.length; idx += 1) {
            if (graph.edges[idx].source === nodeId) {
                result.push(graph.edges[idx]);
            }
        }
        return result;
    }

    static incomers(graph:RelineGraphSchema, nodeId:String) {
        const result = [];
        for (let idx = 0; idx < graph.edges.length; idx += 1) {
            if (graph.edges[idx].target === nodeId) {
                result.push(graph.edges[idx]);
            }
        }
        return result;
    }

    static DFS(graph:RelineGraphSchema, nodeVisitor:RelineNodeVisitor, rootNodeId:string) {
        nodeVisitor.enterNode(this.getElementById(graph, rootNodeId));
        for (const edge of this.outgoers(graph, rootNodeId)) {
            this.DFS(graph, nodeVisitor, edge.target);
        }
        nodeVisitor.exitNode(this.getElementById(graph, rootNodeId));
    }

    static BFS() {

    }

    static searchEdgeById(graph:RelineGraphSchema, id:string) :number {
        for (let idx = 0; idx < graph.edges.length; idx += 1) {
            if (graph.edges[idx].id === id) {
                return idx;
            }
        }
        return -1;
    }

    static toJson(graph:RelineGraphSchema):string {
        return JSON.stringify(graph, null, 4);
    }

    static fromJson(jsonText:string):RelineGraphSchema {
        const validator = new RelineValidator();
        const graphLikeObject = JSON.parse(jsonText);
        if (validator.isValidGraph(graphLikeObject)) {
            return <RelineGraphSchema>(graphLikeObject);
        }
        throw Error("Invalid Reline Graph.");
    }
}
export default RelineGraphUtil;

const t = RelineGraphUtil.create("1", { strict: true });
if (t) {
    RelineGraphUtil.insertNode(t, RelineNodeUtil.create("Reline", { strict: true }), { strict: true });
    RelineGraphUtil.insertNode(t, RelineNodeUtil.create("资源层", { strict: true }), { strict: true }, "Reline");
    RelineGraphUtil.insertNode(t, RelineNodeUtil.create("视图管理器", { strict: true }), { strict: true }, "Reline");
    RelineGraphUtil.insertNode(t, RelineNodeUtil.create("状态管理器", { strict: true }), { strict: true }, "Reline");
    RelineGraphUtil.insertNode(t, RelineNodeUtil.create("对象管理器", { strict: true }), { strict: true }, "Reline");
    RelineGraphUtil.insertNode(t, RelineNodeUtil.create("Redux", { strict: true }), { strict: true }, "状态管理器");
}
// console.log(t);
