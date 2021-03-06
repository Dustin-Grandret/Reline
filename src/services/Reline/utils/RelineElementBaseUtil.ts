/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
import _ from "underscore";

import { RelineElementBaseSchema } from "../interfaces/elementBase.relineSchema";

import fastCopy from "../../utils/fastCopy";
import Options from "../../utils/relineOptions";
import FieldNameFlag from "../../utils/fieldNameFlag";

/**
 * Class representing an util of RelineElementBase
 * @module RelineElementBaseUtil
 * @namespace RelineElementBaseUtil
 */
class RelineElementBaseUtil {
    /**
     * Error when passing "" {strict:true} to createField,updateField,deleteField
     * @var FIELD_NAME_EMPTY
     * @static
     */
    static FIELD_NAME_EMPTY = "FieldName is empty and function is in strict-mode";

    /**
     * Error when passing {strict:true} field name which is
     * not in the node.metadata to update(), deleteField()
     * @var FIELD_NAME_NOT_FOUNDED
     * @static
     */
    static FIELD_NAME_NOT_FOUNDED = "FieldName is not founded in elementBase and function is in strict-mode";

    /**
     * Error when passing duplicated field name to createField()
     * @var FIELD_NAME_DUPLICATED
     * @static
     */
    static FIELD_NAME_DUPLICATED = "Duplicated creating feild in strict mode";

    /**
     * Error when passing "" to create(), updateId()
     * @var ID_EMPTY
     * @static
     */
    static ID_EMPTY = "Updating or Creating elementBase id with empty string";

    /**
     * PARAMETER INMUTABLE
     * Create a new elementBase with given elementBase. If 'id' is a empty string, return undefined.
     * and throw an exception if options.strict is true.
     * @param {String} id The id of the given elementBase.
     * Invoker should the uniqueness of the id of elementBase.
     * @param {{strict:boolean}} options
     * @returns {RelineElementBaseSchema|undefined}
     */
    static create(id:string, options:Options):RelineElementBaseSchema|undefined {
        if (id === "") {
            if (options.strict) {
                throw Error(RelineElementBaseUtil.ID_EMPTY);
            } else {
                return undefined;
            }
        }
        return {
            id,
            metadata: {
                basic: {
                    id,
                    label: "",
                },
            },
        };
    }

    /**
     * PARAMETER INMUTABLE
     * Returns a copy of a given elementBase. This function will not do checking for 'elementBase'.
     * Use RelineValidator to verify the parameter(s) before using it.
     * @param {RelineElementBaseSchema} elementBase
     * @returns {RelineElementBaseSchema} a copy of the elementBase
     */
    static copy(elementBase : RelineElementBaseSchema) : RelineElementBaseSchema {
        return fastCopy(elementBase);
    }

    /**
     * PARAMETER INMUTABLE
     * True if elementBase1,elementBase2 have value equality in their metadata(without feild basic).
     * This function will not do checking for param:elementBase1,elementBase2.
     * Use RelineValidator to verify the parameter(s) before using it.
     * @param {RelineElementBaseSchema} elementBase1
     * @param {RelineElementBaseSchema} elementBase2
     * @returns {Boolean}
     */
    static isEqual(
        elementBase1: RelineElementBaseSchema,
        elementBase2: RelineElementBaseSchema,
    ):boolean {
        const elementBasesMetaData = ([elementBase1.metadata, elementBase2.metadata]).map(
            (item) => {
                const { basic, ...other } = item;
                return { ...other };
            },
        );
        return _.isEqual(elementBasesMetaData[0], elementBasesMetaData[1]);
    }

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
    static updateField(
        elementBase:RelineElementBaseSchema,
        fieldName:string,
        field:Object,
        options:Options,
    ):RelineElementBaseSchema {
        let fieldNameFlag = 0;
        if (fieldName === "") {
            fieldNameFlag = FieldNameFlag.emptyString;
        } else if (!(Object.prototype.hasOwnProperty.call(elementBase.metadata, fieldName))) {
            fieldNameFlag = FieldNameFlag.notFounded;
        } else {
            fieldNameFlag = FieldNameFlag.founded;
        }

        if (fieldNameFlag === FieldNameFlag.emptyString && options.strict) {
            throw Error(RelineElementBaseUtil.FIELD_NAME_EMPTY);
        } else if (fieldNameFlag === FieldNameFlag.emptyString && !options.strict) {
            return elementBase;
        } else if (fieldNameFlag === FieldNameFlag.notFounded && options.strict) {
            throw Error(RelineElementBaseUtil.FIELD_NAME_NOT_FOUNDED);
        } else if (fieldNameFlag === FieldNameFlag.notFounded && !options.strict) {
            const temp = <any>(elementBase);
            temp.metadata[fieldName] = field;
            return <RelineElementBaseSchema>temp;
        } else if (fieldNameFlag === FieldNameFlag.founded && options.strict) {
            const temp = <any>(elementBase);
            temp.metadata[fieldName] = field;
            return <RelineElementBaseSchema>temp;
        } else { // (fileNameFlag === FieldNameFlag.founded && !options.strict)
            const temp = <any>(elementBase);
            temp.metadata[fieldName] = field;
            return <RelineElementBaseSchema>temp;
        }
    }

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
    static createField(
        elementBase:RelineElementBaseSchema,
        fieldName:string,
        options:Options,
    ):RelineElementBaseSchema {
        let fieldNameFlag = 0;
        if (fieldName === "") {
            fieldNameFlag = FieldNameFlag.emptyString;
        } else if (!(Object.prototype.hasOwnProperty.call(elementBase.metadata, fieldName))) {
            fieldNameFlag = FieldNameFlag.notFounded;
        } else {
            fieldNameFlag = FieldNameFlag.founded;
        }

        if (fieldNameFlag === FieldNameFlag.emptyString && options.strict) {
            throw Error(RelineElementBaseUtil.FIELD_NAME_EMPTY);
        } else if (fieldNameFlag === FieldNameFlag.emptyString && !options.strict) {
            return elementBase;
        } else if (fieldNameFlag === FieldNameFlag.notFounded && options.strict) {
            const temp = <any>(elementBase);
            temp.metadata[fieldName] = {};
            return <RelineElementBaseSchema>temp;
        } else if (fieldNameFlag === FieldNameFlag.notFounded && !options.strict) {
            const temp = <any>(elementBase);
            temp.metadata[fieldName] = {};
            return <RelineElementBaseSchema>temp;
        } else if (fieldNameFlag === FieldNameFlag.founded && options.strict) {
            throw Error(RelineElementBaseUtil.FIELD_NAME_DUPLICATED);
        } else { // (fileNameFlag === FieldNameFlag.founded && !options.strict)
            return elementBase;
        }
    }

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
    static deleteField(
        elementBase:RelineElementBaseSchema,
        fieldName: string,
        options: Options,
    ): RelineElementBaseSchema {
        let fieldNameFlag = 0;
        if (fieldName === "") {
            fieldNameFlag = FieldNameFlag.emptyString;
        } else if (!(Object.prototype.hasOwnProperty.call(elementBase.metadata, fieldName))) {
            fieldNameFlag = FieldNameFlag.notFounded;
        } else {
            fieldNameFlag = FieldNameFlag.founded;
        }

        if (fieldNameFlag === FieldNameFlag.emptyString && options.strict) {
            throw Error(RelineElementBaseUtil.FIELD_NAME_EMPTY);
        } else if (fieldNameFlag === FieldNameFlag.emptyString && !options.strict) {
            return elementBase;
        } else if (fieldNameFlag === FieldNameFlag.notFounded && options.strict) {
            throw Error(RelineElementBaseUtil.FIELD_NAME_NOT_FOUNDED);
        } else if (fieldNameFlag === FieldNameFlag.notFounded && !options.strict) {
            return elementBase;
        } else if (fieldNameFlag === FieldNameFlag.founded && options.strict) {
            delete (elementBase.metadata)[fieldName];
            return elementBase;
        } else { // (fileNameFlag === FieldNameFlag.founded && !options.strict)
            delete (elementBase.metadata)[fieldName];
            return elementBase;
        }
    }

    /**
     * PARAMETER INMUTABLE
     * True if field1,field2 have value equality.
     * @param {Object} field1
     * @param {Object} field2
     * @return {Boolean}
     */
    static isEqualField(field1:object, field2: object): boolean {
        return _.isEqual(field1, field2);
    }

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
    static updateId(elementBase:RelineElementBaseSchema, newId:string):RelineElementBaseSchema {
        if (newId !== "") {
            elementBase.id = newId;
            elementBase.metadata.basic.id = newId;
            return elementBase;
        }
        throw Error(RelineElementBaseUtil.ID_EMPTY);
    }

    static setMetadata(
        elementBase:RelineElementBaseSchema,
        newMetaData:object,
    ):RelineElementBaseSchema {
        (<any>elementBase).metadata = newMetaData;
        return elementBase;
    }

    static changeLabel(element:RelineElementBaseSchema, value:string) {
        element.metadata.basic.label = value;
    }
}

export default RelineElementBaseUtil;
