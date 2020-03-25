import { HasManyDefinition } from '../relation.types';
/**
 * Relation definition with optional metadata (e.g. `keyTo`) filled in.
 * @internal
 */
export declare type HasManyResolvedDefinition = HasManyDefinition & {
    keyFrom: string;
    keyTo: string;
};
/**
 * Resolves given hasMany metadata if target is specified to be a resolver.
 * Mainly used to infer what the `keyTo` property should be from the target's
 * belongsTo metadata
 * @param relationMeta - hasMany metadata to resolve
 * @internal
 */
export declare function resolveHasManyMetadata(relationMeta: HasManyDefinition): HasManyResolvedDefinition;
