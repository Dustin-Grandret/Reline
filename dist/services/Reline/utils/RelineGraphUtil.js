"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var RelineElementBaseUtil_1 = __importDefault(require("./RelineElementBaseUtil"));
var RelineNodeUtil_1 = __importDefault(require("./RelineNodeUtil"));
var RelineEdgeUtil_1 = __importDefault(require("./RelineEdgeUtil"));
/**
 * Class RelineGraphUtil represent a util for RelineGraph.
 * @module RelineGraphUtil
 * @namespace RelineGraphUtil
 */
var RelineGraphUtil = /** @class */ (function (_super) {
    __extends(RelineGraphUtil, _super);
    function RelineGraphUtil() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
    RelineGraphUtil.create = function (id, options) {
        var newGraph = RelineElementBaseUtil_1.default.create(id, options);
        if (newGraph) {
            newGraph.nodes = {};
            newGraph.edges = [];
            return newGraph;
        }
        return undefined;
    };
    /**
     * Determine a graph has a given node(compare with value)
     * @param {RelineGraphSchema} graph
     * @param {RelineNodeSchema} node
     * @returns {boolean}
    */
    RelineGraphUtil.hasNode = function (graph, node) {
        for (var nodeId in graph.nodes) {
            if (RelineNodeUtil_1.default.isEqual(graph.nodes[nodeId], node)) {
                return true;
            }
        }
        return false;
    };
    /**
     * Determine a graph has a given node(compare with value)
     * @param graph
     * @param edge
     */
    RelineGraphUtil.hasEdge = function (graph, edge) {
        for (var _i = 0, _a = graph.edges; _i < _a.length; _i++) {
            var curEdge = _a[_i];
            if (RelineEdgeUtil_1.default.isEqual(curEdge, edge)) {
                return true;
            }
        }
        return false;
    };
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
    RelineGraphUtil.isEqual = function (graph1, graph2) {
        if (!RelineElementBaseUtil_1.default.isEqual(graph1, graph2)) {
            return false;
        }
        for (var nodeId in graph1.nodes) {
            if (!RelineGraphUtil.hasNode(graph2, graph1.nodes[nodeId])) {
                return false;
            }
        }
        for (var nodeId in graph2.nodes) {
            if (!RelineGraphUtil.hasNode(graph1, graph2.nodes[nodeId])) {
                return false;
            }
        }
        for (var _i = 0, _a = graph1.edges; _i < _a.length; _i++) {
            var curEdge = _a[_i];
            if (!RelineGraphUtil.hasEdge(graph2, curEdge)) {
                return false;
            }
        }
        for (var _b = 0, _c = graph2.edges; _b < _c.length; _b++) {
            var curEdge = _c[_b];
            if (!RelineGraphUtil.hasEdge(graph1, curEdge)) {
                return false;
            }
        }
        return true;
    };
    RelineGraphUtil.insertNode = function () {
    };
    RelineGraphUtil.deleteNode = function () {
    };
    RelineGraphUtil.updateNode = function () {
    };
    RelineGraphUtil.getNode = function () {
    };
    RelineGraphUtil.addEdge = function () {
    };
    RelineGraphUtil.updateEdge = function () {
    };
    RelineGraphUtil.getEdge = function () {
    };
    RelineGraphUtil.outgoers = function () {
    };
    RelineGraphUtil.incomers = function () {
    };
    RelineGraphUtil.DFS = function () {
    };
    RelineGraphUtil.BFS = function () {
    };
    return RelineGraphUtil;
}(RelineElementBaseUtil_1.default));
exports.default = RelineGraphUtil;
//# sourceMappingURL=RelineGraphUtil.js.map