import { Entity } from '../../model';
import { EntityCrudRepository } from '../../repositories/repository';
import { BelongsToDefinition, Getter, InclusionResolver } from '../relation.types';
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
export declare function createBelongsToInclusionResolver<Target extends Entity, TargetID, TargetRelations extends object>(meta: BelongsToDefinition, getTargetRepo: Getter<EntityCrudRepository<Target, TargetID, TargetRelations>>): InclusionResolver<Entity, Target>;
