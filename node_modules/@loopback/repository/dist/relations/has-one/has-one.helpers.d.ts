import { HasOneDefinition } from '../relation.types';
/**
 * Relation definition with optional metadata (e.g. `keyTo`) filled in.
 * @internal
 */
export declare type HasOneResolvedDefinition = HasOneDefinition & {
    keyFrom: string;
    keyTo: string;
};
/**
 * Resolves given hasOne metadata if target is specified to be a resolver.
 * Mainly used to infer what the `keyTo` property should be from the target's
 * hasOne metadata
 * @param relationMeta - hasOne metadata to resolve
 * @internal
 */
export declare function resolveHasOneMetadata(relationMeta: HasOneDefinition): HasOneResolvedDefinition;
