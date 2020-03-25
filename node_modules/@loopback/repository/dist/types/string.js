"use strict";
// Copyright IBM Corp. 2017,2019. All Rights Reserved.
// Node module: @loopback/repository
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * String type
 */
class StringType {
    constructor() {
        this.name = 'string';
    }
    isInstance(value) {
        return value == null || typeof value === 'string';
    }
    isCoercible(value) {
        return true;
    }
    defaultValue() {
        return '';
    }
    coerce(value) {
        if (value == null)
            return value;
        if (typeof value.toJSON === 'function') {
            value = value.toJSON();
        }
        if (typeof value === 'object') {
            return JSON.stringify(value);
        }
        return String(value);
    }
    serialize(value) {
        return value;
    }
}
exports.StringType = StringType;
//# sourceMappingURL=string.js.map