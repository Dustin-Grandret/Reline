/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */

import { RelineEdgeSchema } from "../interfaces/edge.relineSchema";

import Options from "../../utils/relineOptions";
import RelineElementBaseUtil from "./RelineElementBaseUtil";
import { RelineElementBaseSchema } from "../interfaces/elementBase.relineSchema";
/**
 * Class representing an util of RelineEdge
 * @module RelineEdgeUtil
 * @namespace RelineEdgeUtil
 */
class RelineEdgeUtil extends RelineElementBaseUtil {
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
    static create(id: string, options: Options): RelineEdgeSchema | undefined {
        const newEdge = <RelineEdgeSchema> RelineElementBaseUtil.create(id, options);
        if (newEdge) {
            newEdge.source = "";
            newEdge.target = "";
        }
        return newEdge;
    }

    /**
     * PARAMETER INMUTABLE
     * True if elementBase1,elementBase2 have value equality in their metadata(without feild basic).
     * and sources,targets.
     * This function will not do checking for param:elementBase1,elementBase2.
     * Use RelineValidator to verify the parameter(s) before using it.
     * @param {RelineElementBaseSchema} elementBase1
     * @param {RelineElementBaseSchema} elementBase2
     * @returns {Boolean}
     */
    static isEqual(
        elementBase1: RelineEdgeSchema,
        elementBase2: RelineEdgeSchema,
    ): boolean {
        return RelineElementBaseUtil.isEqual(elementBase1, elementBase2)
        && elementBase1.source === elementBase2.source
        && elementBase1.target === elementBase2.target;
    }

    /**
     * PARAMETER MUTABLE
     * Update source and target with ids.
     * and sources,targets.
     * This function will not do checking for param:elementBase1.
     * Use RelineValidator to verify the parameter(s) before using it.
     * @param {RelineElementBaseSchema} elementBase1
     * @param {RelineElementBaseSchema} elementBase2
     * @returns {Boolean}
     */
    static updateEnds(edge:RelineEdgeSchema, sourceId:string, targetId:string):RelineEdgeSchema {
        edge.source = (sourceId || edge.source);
        edge.target = (targetId || edge.target);
        return edge;
    }

    static updateField(
        elementBase: RelineEdgeSchema,
        fieldName: string,
        field: Object,
        options: Options,
    ): RelineEdgeSchema {
        return <RelineEdgeSchema>RelineElementBaseUtil.updateField(
            <RelineElementBaseSchema>elementBase,
            fieldName,
            field,
            options,
        );
    }
}

export default RelineEdgeUtil;
