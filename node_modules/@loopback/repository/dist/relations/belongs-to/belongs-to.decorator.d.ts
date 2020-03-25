import { Entity, EntityResolver, PropertyDefinition } from '../../model';
import { BelongsToDefinition } from '../relation.types';
/**
 * Decorator for belongsTo
 * @param targetResolver - A resolver function that returns the target model for
 * a belongsTo relation
 * @param definition - Optional metadata for setting up a belongsTo relation
 * @param propertyDefinition - Optional metadata for setting up the property
 * @returns A property decorator
 */
export declare function belongsTo<T extends Entity>(targetResolver: EntityResolver<T>, definition?: Partial<BelongsToDefinition>, propertyDefinition?: Partial<PropertyDefinition>): (decoratedTarget: Entity, decoratedKey: string) => void;
