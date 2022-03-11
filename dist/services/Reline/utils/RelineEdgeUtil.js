"use strict";
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
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
/**
 * Class representing an util of RelineEdge
 * @module RelineEdgeUtil
 * @namespace RelineEdgeUtil
 */
var RelineEdgeUtil = /** @class */ (function (_super) {
    __extends(RelineEdgeUtil, _super);
    function RelineEdgeUtil() {
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
    RelineEdgeUtil.create = function (id, options) {
        var newEdge = RelineElementBaseUtil_1.default.create(id, options);
        if (newEdge) {
            newEdge.source = "";
            newEdge.target = "";
        }
        return newEdge;
    };
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
    RelineEdgeUtil.isEqual = function (elementBase1, elementBase2) {
        return RelineElementBaseUtil_1.default.isEqual(elementBase1, elementBase2)
            && elementBase1.source === elementBase2.source
            && elementBase1.target === elementBase2.target;
    };
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
    RelineEdgeUtil.updateEnds = function (edge, sourceId, targetId) {
        edge.source = (sourceId || edge.source);
        edge.target = (targetId || edge.target);
        return edge;
    };
    return RelineEdgeUtil;
}(RelineElementBaseUtil_1.default));
exports.default = RelineEdgeUtil;
//# sourceMappingURL=RelineEdgeUtil.js.map