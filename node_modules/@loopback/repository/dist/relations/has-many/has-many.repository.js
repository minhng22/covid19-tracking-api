"use strict";
// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: @loopback/repository
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const constraint_utils_1 = require("../../repositories/constraint-utils");
class DefaultHasManyRepository {
    /**
     * Constructor of DefaultHasManyEntityCrudRepository
     * @param getTargetRepository - the getter of the related target model repository instance
     * @param constraint - the key value pair representing foreign key name to constrain
     * the target repository instance
     */
    constructor(getTargetRepository, constraint) {
        this.getTargetRepository = getTargetRepository;
        this.constraint = constraint;
    }
    async create(targetModelData, options) {
        const targetRepository = await this.getTargetRepository();
        return targetRepository.create(constraint_utils_1.constrainDataObject(targetModelData, this.constraint), options);
    }
    async find(filter, options) {
        const targetRepository = await this.getTargetRepository();
        return targetRepository.find(constraint_utils_1.constrainFilter(filter, this.constraint), options);
    }
    async delete(where, options) {
        const targetRepository = await this.getTargetRepository();
        return targetRepository.deleteAll(constraint_utils_1.constrainWhere(where, this.constraint), options);
    }
    async patch(dataObject, where, options) {
        const targetRepository = await this.getTargetRepository();
        return targetRepository.updateAll(constraint_utils_1.constrainDataObject(dataObject, this.constraint), constraint_utils_1.constrainWhere(where, this.constraint), options);
    }
}
exports.DefaultHasManyRepository = DefaultHasManyRepository;
//# sourceMappingURL=has-many.repository.js.map