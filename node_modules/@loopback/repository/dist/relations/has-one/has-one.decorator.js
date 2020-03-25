"use strict";
// Copyright IBM Corp. 2018,2019. All Rights Reserved.
// Node module: @loopback/repository
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const relation_decorator_1 = require("../relation.decorator");
const relation_types_1 = require("../relation.types");
/*
 * Decorator for hasOne
 * infers foreign key name from target model name unless explicitly specified
 * @param targetResolver - Target model for hasOne relation
 * @param definition - Optional metadata for setting up hasOne relation
 * @returns A property decorator
 */
function hasOne(targetResolver, definition) {
    return function (decoratedTarget, key) {
        // property.array(targetResolver)(decoratedTarget, key);
        const meta = Object.assign(
        // default values, can be customized by the caller
        {}, 
        // properties provided by the caller
        definition, 
        // properties enforced by the decorator
        {
            type: relation_types_1.RelationType.hasOne,
            targetsMany: false,
            name: key,
            source: decoratedTarget.constructor,
            target: targetResolver,
        });
        relation_decorator_1.relation(meta)(decoratedTarget, key);
    };
}
exports.hasOne = hasOne;
//# sourceMappingURL=has-one.decorator.js.map