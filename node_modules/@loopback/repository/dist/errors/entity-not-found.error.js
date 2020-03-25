"use strict";
// Copyright IBM Corp. 2018,2019. All Rights Reserved.
// Node module: @loopback/repository
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
class EntityNotFoundError extends Error {
    constructor(entityOrName, entityId, extraProperties) {
        const entityName = typeof entityOrName === 'string'
            ? entityOrName
            : entityOrName.modelName || entityOrName.name;
        const quotedId = JSON.stringify(entityId);
        super(`Entity not found: ${entityName} with id ${quotedId}`);
        Error.captureStackTrace(this, this.constructor);
        this.code = 'ENTITY_NOT_FOUND';
        this.entityName = entityName;
        this.entityId = entityId;
        Object.assign(this, extraProperties);
    }
}
exports.EntityNotFoundError = EntityNotFoundError;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isEntityNotFoundError(e) {
    return e instanceof EntityNotFoundError;
}
exports.isEntityNotFoundError = isEntityNotFoundError;
//# sourceMappingURL=entity-not-found.error.js.map