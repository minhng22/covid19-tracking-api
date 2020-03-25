"use strict";
// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: @loopback/repository
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("@loopback/context");
const model_decorator_1 = require("../../decorators/model.decorator");
const relation_decorator_1 = require("../relation.decorator");
const relation_types_1 = require("../relation.types");
/**
 * Decorator for belongsTo
 * @param targetResolver - A resolver function that returns the target model for
 * a belongsTo relation
 * @param definition - Optional metadata for setting up a belongsTo relation
 * @param propertyDefinition - Optional metadata for setting up the property
 * @returns A property decorator
 */
function belongsTo(targetResolver, definition, propertyDefinition) {
    return function (decoratedTarget, decoratedKey) {
        const propMeta = Object.assign({}, 
        // properties provided by the caller
        propertyDefinition, 
        // properties enforced by the decorator
        {
            type: context_1.MetadataInspector.getDesignTypeForProperty(decoratedTarget, decoratedKey),
        });
        model_decorator_1.property(propMeta)(decoratedTarget, decoratedKey);
        // @belongsTo() is typically decorating the foreign key property,
        // e.g. customerId. We need to strip the trailing "Id" suffix from the name.
        const relationName = decoratedKey.replace(/Id$/, '');
        const meta = Object.assign(
        // default values, can be customized by the caller
        {
            keyFrom: decoratedKey,
            name: relationName,
        }, 
        // properties provided by the caller
        definition, 
        // properties enforced by the decorator
        {
            type: relation_types_1.RelationType.belongsTo,
            targetsMany: false,
            source: decoratedTarget.constructor,
            target: targetResolver,
        });
        relation_decorator_1.relation(meta)(decoratedTarget, decoratedKey);
    };
}
exports.belongsTo = belongsTo;
//# sourceMappingURL=belongs-to.decorator.js.map