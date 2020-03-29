"use strict";
// Copyright IBM Corp. 2018,2019. All Rights Reserved.
// Node module: @loopback/rest
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
/**
 * Validator class provides a bunch of functions that perform
 * validations on the request parameters and request body.
 */
class Validator {
    constructor(ctx) {
        this.ctx = ctx;
    }
    /**
     * The validation executed before type coercion. Like
     * checking absence.
     *
     * @param type - A parameter's type.
     * @param value - A parameter's raw value from http request.
     * @param opts - options
     */
    validateParamBeforeCoercion(value, opts) {
        if (this.isAbsent(value) && this.isRequired(opts)) {
            const name = this.ctx.parameterSpec.name;
            throw __1.RestHttpErrors.missingRequired(name);
        }
    }
    /**
     * Check is a parameter required or not.
     *
     * @param opts
     */
    isRequired(opts) {
        if (this.ctx.parameterSpec.required)
            return true;
        if (opts === null || opts === void 0 ? void 0 : opts.required)
            return true;
        return false;
    }
    /**
     * Return `true` if the value is empty, return `false` otherwise.
     *
     * @param value
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isAbsent(value) {
        var _a;
        if (value === '' || value === undefined)
            return true;
        const spec = this.ctx.parameterSpec;
        const schema = (_a = this.ctx.parameterSpec.schema) !== null && _a !== void 0 ? _a : {};
        const valueIsNull = value === 'null' || value === null;
        if (this.isUrlEncodedJsonParam()) {
            // is this an url encoded Json object query parameter?
            // check for NULL values
            if (valueIsNull)
                return true;
        }
        else if (spec.schema) {
            // if parameter spec contains schema object, check if supplied value is NULL
            if (schema.type === 'object' && valueIsNull)
                return true;
        }
        return false;
    }
    /**
     * Return `true` if defined specification is for a url encoded Json object query parameter
     *
     * for url encoded Json object query parameters,
     * schema is defined under content['application/json']
     */
    isUrlEncodedJsonParam() {
        var _a, _b;
        const spec = this.ctx.parameterSpec;
        if (spec.in === 'query' && ((_b = (_a = spec.content) === null || _a === void 0 ? void 0 : _a['application/json']) === null || _b === void 0 ? void 0 : _b.schema)) {
            return true;
        }
        return false;
    }
}
exports.Validator = Validator;
//# sourceMappingURL=validator.js.map