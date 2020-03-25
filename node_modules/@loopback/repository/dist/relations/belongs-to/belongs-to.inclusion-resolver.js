"use strict";
// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/repository
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const relation_helpers_1 = require("../relation.helpers");
const belongs_to_helpers_1 = require("./belongs-to.helpers");
/**
 * Creates InclusionResolver for BelongsTo relation.
 * Notice that this function only generates the inclusionResolver.
 * It doesn't register it for the source repository.
 *
 * Notice: scope field for inclusion is not supported yet
 *
 * @param meta - resolved BelongsToMetadata
 * @param getTargetRepo - target repository i.e where related instances are
 */
function createBelongsToInclusionResolver(meta, getTargetRepo) {
    const relationMeta = belongs_to_helpers_1.resolveBelongsToMetadata(meta);
    return async function fetchIncludedModels(entities, inclusion, options) {
        if (!entities.length)
            return [];
        const sourceKey = relationMeta.keyFrom;
        const sourceIds = entities.map(e => e[sourceKey]);
        const targetKey = relationMeta.keyTo;
        const targetRepo = await getTargetRepo();
        const targetsFound = await relation_helpers_1.findByForeignKeys(targetRepo, targetKey, relation_helpers_1.deduplicate(sourceIds), inclusion.scope, options);
        return relation_helpers_1.flattenTargetsOfOneToOneRelation(sourceIds, targetsFound, targetKey);
    };
}
exports.createBelongsToInclusionResolver = createBelongsToInclusionResolver;
//# sourceMappingURL=belongs-to.inclusion-resolver.js.map