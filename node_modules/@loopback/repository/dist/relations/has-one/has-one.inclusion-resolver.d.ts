import { Entity } from '../../model';
import { EntityCrudRepository } from '../../repositories/repository';
import { Getter, HasOneDefinition, InclusionResolver } from '../relation.types';
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
export declare function createHasOneInclusionResolver<Target extends Entity, TargetID, TargetRelations extends object>(meta: HasOneDefinition, getTargetRepo: Getter<EntityCrudRepository<Target, TargetID, TargetRelations>>): InclusionResolver<Entity, Target>;
