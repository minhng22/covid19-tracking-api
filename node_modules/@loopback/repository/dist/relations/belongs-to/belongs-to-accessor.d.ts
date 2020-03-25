import { Entity } from '../../model';
import { EntityCrudRepository } from '../../repositories/repository';
import { BelongsToDefinition, Getter, InclusionResolver } from '../relation.types';
export interface BelongsToAccessor<Target extends Entity, SourceId> {
    /**
     * Invoke the function to obtain HasManyRepository.
     */
    (sourceId: SourceId): Promise<Target>;
    /**
     * Use `resolver` property to obtain an InclusionResolver for this relation.
     */
    inclusionResolver: InclusionResolver<Entity, Target>;
}
/**
 * Enforces a BelongsTo constraint on a repository
 */
export declare function createBelongsToAccessor<Target extends Entity, TargetId, Source extends Entity, SourceId>(belongsToMetadata: BelongsToDefinition, targetRepoGetter: Getter<EntityCrudRepository<Target, TargetId>>, sourceRepository: EntityCrudRepository<Source, SourceId>): BelongsToAccessor<Target, SourceId>;
