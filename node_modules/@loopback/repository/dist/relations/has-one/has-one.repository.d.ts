import { Getter } from '@loopback/context';
import { Count, DataObject, Options } from '../../common-types';
import { Entity } from '../../model';
import { Filter } from '../../query';
import { EntityCrudRepository } from '../../repositories';
/**
 * CRUD operations for a target repository of a HasMany relation
 */
export interface HasOneRepository<Target extends Entity> {
    /**
     * Create a target model instance
     * @param targetModelData - The target model data
     * @param options - Options for the operation
     * @returns A promise which resolves to the newly created target model instance
     */
    create(targetModelData: DataObject<Target>, options?: Options): Promise<Target>;
    /**
     * Find the only target model instance that belongs to the declaring model.
     * @param filter - Query filter without a Where condition
     * @param options - Options for the operations
     * @returns A promise resolved with the target object or rejected
     * with an EntityNotFoundError when target model instance was not found.
     */
    get(filter?: Pick<Filter<Target>, Exclude<keyof Filter<Target>, 'where'>>, options?: Options): Promise<Target>;
    /**
     * Delete the related target model instance
     * @param options
     * @returns A promise which resolves the deleted target model instances
     */
    delete(options?: Options): Promise<Count>;
    /**
     * Patch the  related target model instance
     * @param dataObject - The target model fields and their new values to patch
     * @param options
     * @returns A promise which resolves the patched target model instances
     */
    patch(dataObject: DataObject<Target>, options?: Options): Promise<Count>;
}
export declare class DefaultHasOneRepository<TargetEntity extends Entity, TargetID, TargetRepository extends EntityCrudRepository<TargetEntity, TargetID>> implements HasOneRepository<TargetEntity> {
    getTargetRepository: Getter<TargetRepository>;
    constraint: DataObject<TargetEntity>;
    /**
     * Constructor of DefaultHasOneEntityCrudRepository
     * @param getTargetRepository - the getter of the related target model repository instance
     * @param constraint - the key value pair representing foreign key name to constrain
     * the target repository instance
     */
    constructor(getTargetRepository: Getter<TargetRepository>, constraint: DataObject<TargetEntity>);
    create(targetModelData: DataObject<TargetEntity>, options?: Options): Promise<TargetEntity>;
    get(filter?: Pick<Filter<TargetEntity>, Exclude<keyof Filter<TargetEntity>, 'where'>>, options?: Options): Promise<TargetEntity>;
    delete(options?: Options): Promise<Count>;
    patch(dataObject: DataObject<TargetEntity>, options?: Options): Promise<Count>;
}
