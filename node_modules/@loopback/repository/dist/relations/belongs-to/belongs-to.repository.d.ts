import { Getter } from '@loopback/context';
import { DataObject, Options } from '../../common-types';
import { Entity } from '../../model';
import { EntityCrudRepository } from '../../repositories/repository';
/**
 * CRUD operations for a target repository of a BelongsTo relation
 */
export interface BelongsToRepository<Target extends Entity> {
    /**
     * Gets the target model instance
     * @param options
     * @returns A promise resolved with the target object or rejected
     * with an EntityNotFoundError when target model instance was not found.
     */
    get(options?: Options): Promise<Target>;
}
export declare class DefaultBelongsToRepository<TargetEntity extends Entity, TargetId, TargetRepository extends EntityCrudRepository<TargetEntity, TargetId>> implements BelongsToRepository<TargetEntity> {
    getTargetRepository: Getter<TargetRepository>;
    constraint: DataObject<TargetEntity>;
    /**
     * Constructor of DefaultBelongsToEntityCrudRepository
     * @param getTargetRepository - the getter of the related target model repository instance
     * @param constraint - the key value pair representing foreign key name to constrain
     * the target repository instance
     */
    constructor(getTargetRepository: Getter<TargetRepository>, constraint: DataObject<TargetEntity>);
    get(options?: Options): Promise<TargetEntity>;
}
