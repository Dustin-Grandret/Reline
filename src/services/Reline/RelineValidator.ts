import { Validator } from "jsonschema";
import RelineElementBaseSchema from "./schema/elementBase.relineSchema.json";
import RelineNodeSchema from "./schema/node.relineSchema.json";
import RelineEdgeSchema from "./schema/edge.relineSchema.json";
import RelineGraphSchema from "./schema/graph.relineSchema.json";
import RelineGraphsSchema from "./schema/graphs.relineSchema.json";

/**
 * Class represent a validator of Reline elements
 */
class RelineValidator {
    elementBaseValidator:Validator;

    elementBaseSchema:Object;

    nodeValidator:Validator;

    nodeSchema:Object;

    edgeValidator:Validator;

    edgeSchema:Object;

    graphValidator:Validator;

    graphSchema:Object;

    graphsValidator:Validator;

    graphsSchema:Object;

    constructor() {
        // TODO: Constructor是否可以重复使用validator
        this.elementBaseValidator = new Validator();
        this.elementBaseSchema = RelineElementBaseSchema;

        this.nodeValidator = new Validator();
        this.nodeSchema = RelineNodeSchema;

        this.edgeValidator = new Validator();
        this.edgeSchema = RelineEdgeSchema;

        this.graphValidator = new Validator();
        this.graphValidator.addSchema(this.nodeSchema, "node.relineSchema.json");
        this.graphValidator.addSchema(this.edgeSchema, "edge.relineSchema.json");
        this.graphSchema = RelineGraphSchema;

        this.graphsValidator = new Validator();
        this.graphsValidator.addSchema(this.nodeSchema, "node.relineSchema.json");
        this.graphsValidator.addSchema(this.edgeSchema, "edge.relineSchema.json");
        this.graphsValidator.addSchema(this.graphSchema, "graph.relineSchema.json");
        this.graphsSchema = RelineGraphsSchema;
    }

    /**
     * Verifies the object is a Reline ElementBase.
     * @param object {Object}
     * @returns {Boolean}
     */
    isValidElementBase(object:any): boolean {
        const schemaAnalysisResult = this.elementBaseValidator
            .validate(object, this.elementBaseSchema);
        const schemaErrorsNum = schemaAnalysisResult.errors.length;
        if (schemaErrorsNum !== 0) {
            return false;
        }

        // Check object.id===object.metadata.basic.id
        const relineElementBaseAnalysisResult = (object.id === object.metadata.basic.id);

        if (!relineElementBaseAnalysisResult) {
            return false;
        }
        return true;
    }

    /**
     * Verifies the object is a Reline Node.
     * @param object {Object}
     * @returns {Boolean}
     */
    isValidNode(object:any): boolean {
        const schemaAnalysisResult = this.nodeValidator.validate(object, this.nodeSchema);
        const schemaErrorsNum = schemaAnalysisResult.errors.length;
        if (schemaErrorsNum !== 0) {
            return false;
        }
        // Check object.id===object.metadata.basic.id
        const relineNodeAnalysisResult = (object.id === object.metadata.basic.id);

        if (!relineNodeAnalysisResult) {
            return false;
        }
        return true;
    }

    /**
     * Verifies the object is a Reline Edge.
     * @param object {Object}
     * @returns {Boolean}
     */
    isValidEdge(object:any): boolean {
        const schemaAnalysisResult = this.edgeValidator.validate(object, this.edgeSchema);
        const schemaErrorsNum = schemaAnalysisResult.errors.length;
        if (schemaErrorsNum !== 0) {
            return false;
        }
        // Check object.id===object.metadata.basic.id
        const relineEdgeAnalysisResult = (object.id === object.metadata.basic.id);

        if (!relineEdgeAnalysisResult) {
            return false;
        }
        return true;
    }

    /**
     * Verifies the object is a Reline Graph.
     * @param object {Object}
     * @returns {Boolean}
     */
    isValidGraph(object:any): boolean {
        // TODO: 此处重复检查了node和edge的json格式，可以分割代码来减少检查次数。
        const schemaAnalysisResult = this.graphValidator.validate(object, this.graphSchema);
        const schemaErrorsNum = schemaAnalysisResult.errors.length;
        if (schemaErrorsNum !== 0) {
            console.log(schemaAnalysisResult);
            return false;
        }

        // Check every node.id in object has the same value of their key, every node is valid.
        // eslint-disable-next-line no-restricted-syntax
        for (const nodeId in object.nodes) {
            if (object.nodes[nodeId].id !== nodeId || !this.isValidNode(object.nodes[nodeId])) {
                return false;
            }
        }

        // eslint-disable-next-line no-restricted-syntax
        for (const edge of object.edges) {
            if (!((edge.source in object.nodes) && (edge.target in object.nodes))) {
                return false;
            }
        }
        console.log("123333333333333333");
        return true;
    }

    /**
     * Verifies the object is a Reline Graphs.
     * @param object {Object}
     * @returns {Boolean}
     */
    isValidGraphs(object:Object): boolean {
        const schemaAnalysisResult = this.graphsValidator.validate(object, this.graphsSchema);
        const schemaErrorsNum = schemaAnalysisResult.errors.length;
        if (schemaErrorsNum !== 0) {
            console.log(schemaAnalysisResult);
            return false;
        }
        return true;
    }
}

export default RelineValidator;

/*
const testGraph = {
    id: "1",
};
const a = new RelineElementsValidator();
console.log(a.isValidGraph(testGraph));
*/
