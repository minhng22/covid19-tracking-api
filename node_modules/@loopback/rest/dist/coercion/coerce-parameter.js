"use strict";
// Copyright IBM Corp. 2018,2019. All Rights Reserved.
// Node module: @loopback/rest
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const openapi_v3_1 = require("@loopback/openapi-v3");
const debug_1 = tslib_1.__importDefault(require("debug"));
const __1 = require("../");
const parse_json_1 = require("../parse-json");
const utils_1 = require("./utils");
const validator_1 = require("./validator");
const isRFC3339 = require('validator/lib/isRFC3339');
const debug = debug_1.default('loopback:rest:coercion');
/**
 * Coerce the http raw data to a JavaScript type data of a parameter
 * according to its OpenAPI schema specification.
 *
 * @param data - The raw data get from http request
 * @param schema - The parameter's schema defined in OpenAPI specification
 */
function coerceParameter(data, spec) {
    let schema = spec.schema;
    // If a query parameter is a url encoded Json object, the schema is defined under content['application/json']
    if (!schema && spec.in === 'query' && spec.content) {
        const jsonSpec = spec.content['application/json'];
        schema = jsonSpec.schema;
    }
    if (!schema || openapi_v3_1.isReferenceObject(schema)) {
        debug('The parameter with schema %s is not coerced since schema' +
            'dereference is not supported yet.', schema);
        return data;
    }
    const OAIType = utils_1.getOAIPrimitiveType(schema.type, schema.format);
    const validator = new validator_1.Validator({ parameterSpec: spec });
    validator.validateParamBeforeCoercion(data);
    if (data === undefined)
        return data;
    switch (OAIType) {
        case 'byte':
            return coerceBuffer(data, spec);
        case 'date':
            return coerceDatetime(data, spec, { dateOnly: true });
        case 'date-time':
            return coerceDatetime(data, spec);
        case 'float':
        case 'double':
        case 'number':
            return coerceNumber(data, spec);
        case 'long':
            return coerceInteger(data, spec, { isLong: true });
        case 'integer':
            return coerceInteger(data, spec);
        case 'boolean':
            return coerceBoolean(data, spec);
        case 'object':
            return coerceObject(data, spec);
        case 'string':
        case 'password':
            return coerceString(data, spec);
        default:
            return data;
    }
}
exports.coerceParameter = coerceParameter;
function coerceString(data, spec) {
    if (typeof data !== 'string')
        throw __1.RestHttpErrors.invalidData(data, spec.name);
    debug('data of type string is coerced to %s', data);
    return data;
}
function coerceBuffer(data, spec) {
    if (typeof data === 'object')
        throw __1.RestHttpErrors.invalidData(data, spec.name);
    return Buffer.from(data, 'base64');
}
function coerceDatetime(data, spec, options) {
    if (typeof data === 'object' || utils_1.isEmpty(data))
        throw __1.RestHttpErrors.invalidData(data, spec.name);
    if (options === null || options === void 0 ? void 0 : options.dateOnly) {
        if (!utils_1.matchDateFormat(data))
            throw __1.RestHttpErrors.invalidData(data, spec.name);
    }
    else {
        if (!isRFC3339(data))
            throw __1.RestHttpErrors.invalidData(data, spec.name);
    }
    const coercedDate = new Date(data);
    if (!utils_1.isValidDateTime(coercedDate))
        throw __1.RestHttpErrors.invalidData(data, spec.name);
    return coercedDate;
}
function coerceNumber(data, spec) {
    if (typeof data === 'object' || utils_1.isEmpty(data))
        throw __1.RestHttpErrors.invalidData(data, spec.name);
    const coercedNum = Number(data);
    if (isNaN(coercedNum))
        throw __1.RestHttpErrors.invalidData(data, spec.name);
    debug('data of type number is coerced to %s', coercedNum);
    return coercedNum;
}
function coerceInteger(data, spec, options) {
    if (typeof data === 'object' || utils_1.isEmpty(data))
        throw __1.RestHttpErrors.invalidData(data, spec.name);
    const coercedInt = Number(data);
    if (isNaN(coercedInt))
        throw __1.RestHttpErrors.invalidData(data, spec.name);
    if (options === null || options === void 0 ? void 0 : options.isLong) {
        if (!Number.isInteger(coercedInt))
            throw __1.RestHttpErrors.invalidData(data, spec.name);
    }
    else {
        if (!Number.isSafeInteger(coercedInt))
            throw __1.RestHttpErrors.invalidData(data, spec.name);
    }
    debug('data of type integer is coerced to %s', coercedInt);
    return coercedInt;
}
function coerceBoolean(data, spec) {
    if (typeof data === 'object' || utils_1.isEmpty(data))
        throw __1.RestHttpErrors.invalidData(data, spec.name);
    if (utils_1.isTrue(data))
        return true;
    if (utils_1.isFalse(data))
        return false;
    throw __1.RestHttpErrors.invalidData(data, spec.name);
}
function coerceObject(input, spec) {
    const data = parseJsonIfNeeded(input, spec);
    if (data === undefined) {
        // Skip any further checks and coercions, nothing we can do with `undefined`
        return undefined;
    }
    if (typeof data !== 'object' || Array.isArray(data))
        throw __1.RestHttpErrors.invalidData(input, spec.name);
    // TODO(bajtos) apply coercion based on properties defined by spec.schema
    return data;
}
function parseJsonIfNeeded(data, spec) {
    if (typeof data !== 'string')
        return data;
    if (spec.in !== 'query' || (spec.in === 'query' && !spec.content)) {
        debug('Skipping JSON.parse, argument %s is not a url encoded json object query parameter (since content field is missing in parameter schema)', spec.name);
        return data;
    }
    if (data === '') {
        debug('Converted empty string to object value `undefined`');
        return undefined;
    }
    try {
        const result = parse_json_1.parseJson(data);
        debug('Parsed parameter %s as %j', spec.name, result);
        return result;
    }
    catch (err) {
        debug('Cannot parse %s value %j as JSON: %s', spec.name, data, err.message);
        throw __1.RestHttpErrors.invalidData(data, spec.name, {
            details: {
                syntaxError: err.message,
            },
        });
    }
}
//# sourceMappingURL=coerce-parameter.js.map