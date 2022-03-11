"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonschema_1 = require("jsonschema");
var elementBase_relineSchema_json_1 = __importDefault(require("./schema/elementBase.relineSchema.json"));
var node_relineSchema_json_1 = __importDefault(require("./schema/node.relineSchema.json"));
var edge_relineSchema_json_1 = __importDefault(require("./schema/edge.relineSchema.json"));
var graph_relineSchema_json_1 = __importDefault(require("./schema/graph.relineSchema.json"));
var graphs_relineSchema_json_1 = __importDefault(require("./schema/graphs.relineSchema.json"));
/**
 * Class represent a validator of Reline elements
 */
var RelineValidator = /** @class */ (function () {
    function RelineValidator() {
        // TODO: Constructor是否可以重复使用validator
        this.elementBaseValidator = new jsonschema_1.Validator();
        this.elementBaseSchema = elementBase_relineSchema_json_1.default;
        this.nodeValidator = new jsonschema_1.Validator();
        this.nodeSchema = node_relineSchema_json_1.default;
        this.edgeValidator = new jsonschema_1.Validator();
        this.edgeSchema = edge_relineSchema_json_1.default;
        this.graphValidator = new jsonschema_1.Validator();
        this.graphValidator.addSchema(this.nodeSchema, "node.relineSchema.json");
        this.graphValidator.addSchema(this.edgeSchema, "edge.relineSchema.json");
        this.graphSchema = graph_relineSchema_json_1.default;
        this.graphsValidator = new jsonschema_1.Validator();
        this.graphsValidator.addSchema(this.nodeSchema, "node.relineSchema.json");
        this.graphsValidator.addSchema(this.edgeSchema, "edge.relineSchema.json");
        this.graphsValidator.addSchema(this.graphSchema, "graph.relineSchema.json");
        this.graphsSchema = graphs_relineSchema_json_1.default;
    }
    /**
     * Verifies the object is a Reline ElementBase.
     * @param object {Object}
     * @returns {Boolean}
     */
    RelineValidator.prototype.isValidElementBase = function (object) {
        var schemaAnalysisResult = this.elementBaseValidator
            .validate(object, this.elementBaseSchema);
        var schemaErrorsNum = schemaAnalysisResult.errors.length;
        if (schemaErrorsNum !== 0) {
            return false;
        }
        // Check object.id===object.metadata.basic.id
        var relineElementBaseAnalysisResult = (object.id === object.metadata.basic.id);
        if (!relineElementBaseAnalysisResult) {
            return false;
        }
        return true;
    };
    /**
     * Verifies the object is a Reline Node.
     * @param object {Object}
     * @returns {Boolean}
     */
    RelineValidator.prototype.isValidNode = function (object) {
        var schemaAnalysisResult = this.nodeValidator.validate(object, this.nodeSchema);
        var schemaErrorsNum = schemaAnalysisResult.errors.length;
        if (schemaErrorsNum !== 0) {
            return false;
        }
        // Check object.id===object.metadata.basic.id
        var relineNodeAnalysisResult = (object.id === object.metadata.basic.id);
        if (!relineNodeAnalysisResult) {
            return false;
        }
        return true;
    };
    /**
     * Verifies the object is a Reline Edge.
     * @param object {Object}
     * @returns {Boolean}
     */
    RelineValidator.prototype.isValidEdge = function (object) {
        var schemaAnalysisResult = this.edgeValidator.validate(object, this.edgeSchema);
        var schemaErrorsNum = schemaAnalysisResult.errors.length;
        if (schemaErrorsNum !== 0) {
            return false;
        }
        // Check object.id===object.metadata.basic.id
        var relineEdgeAnalysisResult = (object.id === object.metadata.basic.id);
        if (!relineEdgeAnalysisResult) {
            return false;
        }
        return true;
    };
    /**
     * Verifies the object is a Reline Graph.
     * @param object {Object}
     * @returns {Boolean}
     */
    RelineValidator.prototype.isValidGraph = function (object) {
        // TODO: 此处重复检查了node和edge的json格式，可以分割代码来减少检查次数。
        var schemaAnalysisResult = this.graphValidator.validate(object, this.graphSchema);
        var schemaErrorsNum = schemaAnalysisResult.errors.length;
        if (schemaErrorsNum !== 0) {
            console.log(schemaAnalysisResult);
            return false;
        }
        // Check every node.id in object has the same value of their key, every node is valid.
        // eslint-disable-next-line no-restricted-syntax
        for (var nodeId in object.nodes) {
            if (object.nodes[nodeId].id !== nodeId || !this.isValidNode(object.nodes[nodeId])) {
                return false;
            }
        }
        // eslint-disable-next-line no-restricted-syntax
        for (var _i = 0, _a = object.edges; _i < _a.length; _i++) {
            var edge = _a[_i];
            if (!((edge.source in object.nodes) && (edge.target in object.nodes))) {
                return false;
            }
        }
        return true;
    };
    /**
     * Verifies the object is a Reline Graphs.
     * @param object {Object}
     * @returns {Boolean}
     */
    RelineValidator.prototype.isValidGraphs = function (object) {
        var schemaAnalysisResult = this.graphsValidator.validate(object, this.graphsSchema);
        var schemaErrorsNum = schemaAnalysisResult.errors.length;
        if (schemaErrorsNum !== 0) {
            console.log(schemaAnalysisResult);
            return false;
        }
        return true;
    };
    return RelineValidator;
}());
exports.default = RelineValidator;
/*
const testGraph = {
    id: "1",
};
const a = new RelineElementsValidator();
console.log(a.isValidGraph(testGraph));
*/
//# sourceMappingURL=RelineValidator.js.map