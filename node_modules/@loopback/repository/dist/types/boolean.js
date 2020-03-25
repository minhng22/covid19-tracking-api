"use strict";
// Copyright IBM Corp. 2017,2019. All Rights Reserved.
// Node module: @loopback/repository
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Boolean type
 */
class BooleanType {
    constructor() {
        this.name = 'boolean';
    }
    isInstance(value) {
        return value == null || typeof value === 'boolean';
    }
    defaultValue() {
        return false;
    }
    isCoercible(value) {
        return true;
    }
    coerce(value) {
        return value == null ? value : Boolean(value);
    }
    serialize(value) {
        return value;
    }
}
exports.BooleanType = BooleanType;
//# sourceMappingURL=boolean.js.map