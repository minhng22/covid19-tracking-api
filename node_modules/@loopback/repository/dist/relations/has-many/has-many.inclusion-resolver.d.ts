import { Entity } from '../../model';
import { EntityCrudRepository } from '../../repositories/repository';
import { Getter, HasManyDefinition, InclusionResolver } from '../relation.types';
/**
 * Creates InclusionResolver for HasMany relation.
 * Notice that this function only generates the inclusionResolver.
 * It doesn't register it for the source repository.
 *
 * Notice: scope field for inclusion is not supported yet.
 *
 * @param meta - resolved metadata of the hasMany relation
 * @param getTargetRepo - target repository i.e where related instances are
 */
export declare function createHasManyInclusionResolver<Target extends Entity, TargetID, TargetRelations extends object>(meta: HasManyDefinition, getTargetRepo: Getter<EntityCrudRepository<Target, TargetID, TargetRelations>>): InclusionResolver<Entity, Target>;
