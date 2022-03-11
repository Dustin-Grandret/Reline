"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
var underscore_1 = __importDefault(require("underscore"));
var fastCopy_1 = __importDefault(require("../../utils/fastCopy"));
/**
 * Class representing an util of RelineElementBase
 * @module RelineElementBaseUtil
 * @namespace RelineElementBaseUtil
 */
var RelineElementBaseUtil = /** @class */ (function () {
    function RelineElementBaseUtil() {
    }
    /**
     * PARAMETER INMUTABLE
     * Create a new elementBase with given elementBase. If 'id' is a empty string, return undefined.
     * and throw an exception if options.strict is true.
     * @param {String} id The id of the given elementBase.
     * Invoker should the uniqueness of the id of elementBase.
     * @param {{strict:boolean}} options
     * @returns {RelineElementBaseSchema|undefined}
     */
    RelineElementBaseUtil.create = function (id, options) {
        if (id === "") {
            if (options.strict) {
                throw Error(RelineElementBaseUtil.ID_EMPTY);
            }
            else {
                return undefined;
            }
        }
        return {
            id: id,
            metadata: {
                basic: {
                    id: id,
                },
            },
        };
    };
    /**
     * PARAMETER INMUTABLE
     * Returns a copy of a given elementBase. This function will not do checking for 'elementBase'.
     * Use RelineValidator to verify the parameter(s) before using it.
     * @param {RelineElementBaseSchema} elementBase
     * @returns {RelineElementBaseSchema} a copy of the elementBase
     */
    RelineElementBaseUtil.copy = function (elementBase) {
        return (0, fastCopy_1.default)(elementBase);
    };
    /**
     * PARAMETER INMUTABLE
     * True if elementBase1,elementBase2 have value equality in their metadata(without feild basic).
     * This function will not do checking for param:elementBase1,elementBase2.
     * Use RelineValidator to verify the parameter(s) before using it.
     * @param {RelineElementBaseSchema} elementBase1
     * @param {RelineElementBaseSchema} elementBase2
     * @returns {Boolean}
     */
    RelineElementBaseUtil.isEqual = function (elementBase1, elementBase2) {
        var elementBasesMetaData = ([elementBase1.metadata, elementBase2.metadata]).map(function (item) {
            var basic = item.basic, other = __rest(item, ["basic"]);
            return __assign({}, other);
        });
        return underscore_1.default.isEqual(elementBasesMetaData[0], elementBasesMetaData[1]);
    };
    /**
     * PARAMETER MUTABLE
     * Change the field of the 'elementBase' with a given fieldName.
     * This function will not do checking for param:elementBase.
     * Use RelineValidator to verify the parameter(s) before using it.
     * This function do nothing if fieldName is an empty string.
     * If fieldName is not founded in elementBase.metadata,
     * this function create a field with the given fieldName and field if
     * options.strict is false or throw an exception.
     * // TODO :Use a check table.
     * @param {RelineElementBaseSchema} elementBase
     * @param {string} fieldName
     * @param {Object} field
     * @param {{strict:boolean}} options
     * @returns {RelineElementBaseSchema} the reference of given elementBase for cascading calls.
     */
    RelineElementBaseUtil.updateField = function (elementBase, fieldName, field, options) {
        var fieldNameFlag = 0;
        if (fieldName === "") {
            fieldNameFlag = 1 /* emptyString */;
        }
        else if (!(Object.prototype.hasOwnProperty.call(elementBase.metadata, fieldName))) {
            fieldNameFlag = 2 /* notFounded */;
        }
        else {
            fieldNameFlag = 0 /* founded */;
        }
        if (fieldNameFlag === 1 /* emptyString */ && options.strict) {
            throw Error(RelineElementBaseUtil.FIELD_NAME_EMPTY);
        }
        else if (fieldNameFlag === 1 /* emptyString */ && !options.strict) {
            return elementBase;
        }
        else if (fieldNameFlag === 2 /* notFounded */ && options.strict) {
            throw Error(RelineElementBaseUtil.FIELD_NAME_NOT_FOUNDED);
        }
        else if (fieldNameFlag === 2 /* notFounded */ && !options.strict) {
            var temp = (elementBase);
            temp.metadata[fieldName] = field;
            return temp;
        }
        else if (fieldNameFlag === 0 /* founded */ && options.strict) {
            var temp = (elementBase);
            temp.metadata[fieldName] = field;
            return temp;
        }
        else { // (fileNameFlag === FieldNameFlag.founded && !options.strict)
            var temp = (elementBase);
            temp.metadata[fieldName] = field;
            return temp;
        }
    };
    /**
     * PARAMETER MUTABLE
     * Create a field in a given elementBase.
     * This function will not do checking for param:elementBase.
     * Use RelineValidator to verify the parameter(s) before using it.
     * This function do nothing if fieldName is an empty string.
     * If there is a field with fieldName as it's key,this function will do nothing if
     * options.strict is false.
     * @param {RelineElementBaseSchema} elementBase
     * @param {string} fieldName
     * @param {{strict:boolean}} options
     * @returns {RelineElementBaseSchema} the reference of given elementBase for cascading calls.
     */
    RelineElementBaseUtil.createField = function (elementBase, fieldName, options) {
        var fieldNameFlag = 0;
        if (fieldName === "") {
            fieldNameFlag = 1 /* emptyString */;
        }
        else if (!(Object.prototype.hasOwnProperty.call(elementBase.metadata, fieldName))) {
            fieldNameFlag = 2 /* notFounded */;
        }
        else {
            fieldNameFlag = 0 /* founded */;
        }
        if (fieldNameFlag === 1 /* emptyString */ && options.strict) {
            throw Error(RelineElementBaseUtil.FIELD_NAME_EMPTY);
        }
        else if (fieldNameFlag === 1 /* emptyString */ && !options.strict) {
            return elementBase;
        }
        else if (fieldNameFlag === 2 /* notFounded */ && options.strict) {
            var temp = (elementBase);
            temp.metadata[fieldName] = {};
            return temp;
        }
        else if (fieldNameFlag === 2 /* notFounded */ && !options.strict) {
            var temp = (elementBase);
            temp.metadata[fieldName] = {};
            return temp;
        }
        else if (fieldNameFlag === 0 /* founded */ && options.strict) {
            throw Error(RelineElementBaseUtil.FIELD_NAME_DUPLICATED);
        }
        else { // (fileNameFlag === FieldNameFlag.founded && !options.strict)
            return elementBase;
        }
    };
    /**
     * PARAMETER MUTABLE
     * Delete a field in a given elementBase
     * This function will not do checking for param:elementBase.
     * Use RelineValidator to verify the parameter(s) before using it.
     * This function do nothing if fieldName is an empty string.
     * If there is no feild with fieldName as its key, this function will do nothing if
     * options.strict is false or throw an exception.
     * @param {RelineElementBaseSchema} elementBase
     * @param {String} fieldName
     * @param {{strict:boolean}} options
     * @returns {RelineElementBaseSchema} the reference of given elementBase for cascading calls.
     */
    RelineElementBaseUtil.deleteField = function (elementBase, fieldName, options) {
        var fieldNameFlag = 0;
        if (fieldName === "") {
            fieldNameFlag = 1 /* emptyString */;
        }
        else if (!(Object.prototype.hasOwnProperty.call(elementBase.metadata, fieldName))) {
            fieldNameFlag = 2 /* notFounded */;
        }
        else {
            fieldNameFlag = 0 /* founded */;
        }
        if (fieldNameFlag === 1 /* emptyString */ && options.strict) {
            throw Error(RelineElementBaseUtil.FIELD_NAME_EMPTY);
        }
        else if (fieldNameFlag === 1 /* emptyString */ && !options.strict) {
            return elementBase;
        }
        else if (fieldNameFlag === 2 /* notFounded */ && options.strict) {
            throw Error(RelineElementBaseUtil.FIELD_NAME_NOT_FOUNDED);
        }
        else if (fieldNameFlag === 2 /* notFounded */ && !options.strict) {
            return elementBase;
        }
        else if (fieldNameFlag === 0 /* founded */ && options.strict) {
            delete (elementBase.metadata)[fieldName];
            return elementBase;
        }
        else { // (fileNameFlag === FieldNameFlag.founded && !options.strict)
            delete (elementBase.metadata)[fieldName];
            return elementBase;
        }
    };
    /**
     * PARAMETER INMUTABLE
     * True if field1,field2 have value equality.
     * @param {Object} field1
     * @param {Object} field2
     * @return {Boolean}
     */
    RelineElementBaseUtil.isEqualField = function (field1, field2) {
        return underscore_1.default.isEqual(field1, field2);
    };
    /**
     * PARAMETER MUTABLE
     * Update the id of a given elementBase.
     * This function will not do checking for param:elementBase.
     * Use RelineValidator to verify the parameter(s) before using it.
     * If newId is an empty string, throw an error
     * @param {RelineElementBaseSchema} elementBase
     * @param {string} newId The newid of the given elementBase. Invoker should the
     *  uniqueness of the id of elementBase.
     * @returns {RelineElementBaseSchema} the reference of given elementBase for cascading calls.
     */
    RelineElementBaseUtil.updateId = function (elementBase, newId) {
        if (newId !== "") {
            elementBase.id = newId;
            elementBase.metadata.basic.id = newId;
            return elementBase;
        }
        throw Error(RelineElementBaseUtil.ID_EMPTY);
    };
    /**
     * Error when passing "" {strict:true} to createField,updateField,deleteField
     * @var FIELD_NAME_EMPTY
     * @static
     */
    RelineElementBaseUtil.FIELD_NAME_EMPTY = "FieldName is empty and function is in strict-mode";
    /**
     * Error when passing {strict:true} field name which is
     * not in the node.metadata to update(), deleteField()
     * @var FIELD_NAME_NOT_FOUNDED
     * @static
     */
    RelineElementBaseUtil.FIELD_NAME_NOT_FOUNDED = "FieldName is not founded in elementBase and function is in strict-mode";
    /**
     * Error when passing duplicated field name to createField()
     * @var FIELD_NAME_DUPLICATED
     * @static
     */
    RelineElementBaseUtil.FIELD_NAME_DUPLICATED = "Duplicated creating feild in strict mode";
    /**
     * Error when passing "" to create(), updateId()
     * @var ID_EMPTY
     * @static
     */
    RelineElementBaseUtil.ID_EMPTY = "Updating or Creating elementBase id with empty string";
    return RelineElementBaseUtil;
}());
exports.default = RelineElementBaseUtil;
//# sourceMappingURL=RelineElementBaseUtil.js.map