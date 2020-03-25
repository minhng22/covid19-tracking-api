"use strict";
// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/repository
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const relation_helpers_1 = require("../relation.helpers");
const has_one_helpers_1 = require("./has-one.helpers");
/**
 * Creates InclusionResolver for HasOne relation.
 * Notice that this function only generates the inclusionResolver.
 * It doesn't register it for the source repository.
 *
 * Notice: scope field for inclusion is not supported yet.
 *
 * @param meta
 * @param getTargetRepo
 */
function createHasOneInclusionResolver(meta, getTargetRepo) {
    const relationMeta = has_one_helpers_1.resolveHasOneMetadata(meta);
    return async function fetchHasOneModel(entities, inclusion, options) {
        if (!entities.length)
            return [];
        const sourceKey = relationMeta.keyFrom;
        const sourceIds = entities.map(e => e[sourceKey]);
        const targetKey = relationMeta.keyTo;
        const targetRepo = await getTargetRepo();
        const targetsFound = await relation_helpers_1.findByForeignKeys(targetRepo, targetKey, sourceIds, inclusion.scope, options);
        return relation_helpers_1.flattenTargetsOfOneToOneRelation(sourceIds, targetsFound, targetKey);
    };
}
exports.createHasOneInclusionResolver = createHasOneInclusionResolver;
//# sourceMappingURL=has-one.inclusion-resolver.js.map