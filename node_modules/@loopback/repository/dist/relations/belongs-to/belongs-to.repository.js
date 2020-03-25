"use strict";
// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: @loopback/repository
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../errors");
const constraint_utils_1 = require("../../repositories/constraint-utils");
class DefaultBelongsToRepository {
    /**
     * Constructor of DefaultBelongsToEntityCrudRepository
     * @param getTargetRepository - the getter of the related target model repository instance
     * @param constraint - the key value pair representing foreign key name to constrain
     * the target repository instance
     */
    constructor(getTargetRepository, constraint) {
        this.getTargetRepository = getTargetRepository;
        this.constraint = constraint;
    }
    async get(options) {
        const targetRepo = await this.getTargetRepository();
        const result = await targetRepo.find(constraint_utils_1.constrainFilter(undefined, this.constraint), options);
        if (!result.length) {
            // We don't have a direct access to the foreign key value here :(
            const id = 'constraint ' + JSON.stringify(this.constraint);
            throw new errors_1.EntityNotFoundError(targetRepo.entityClass, id);
        }
        return result[0];
    }
}
exports.DefaultBelongsToRepository = DefaultBelongsToRepository;
//# sourceMappingURL=belongs-to.repository.js.map