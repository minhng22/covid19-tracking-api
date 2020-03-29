import { AnyObject, Command, Count, DataObject, NamedParameters, Options, PositionalParameters } from '../common-types';
import { DataSource } from '../datasource';
import { Entity, Model, ValueObject } from '../model';
import { Filter, FilterExcludingWhere, Where } from '../query';
import { InclusionResolver } from '../relations/relation.types';
import { IsolationLevel, Transaction } from '../transaction';
export interface Repository<T extends Model> {
}
export interface ExecutableRepository<T extends Model> extends Repository<T> {
    /**
     * Execute a query with the given parameter object or an array of parameters
     * @param command - The query string or command object
     * @param parameters - The object with name/value pairs or an array of parameter
     * values
     * @param options - Options
     */
    execute(command: Command, parameters: NamedParameters | PositionalParameters, options?: Options): Promise<AnyObject>;
}
/**
 * A type for CRUD repositories that are backed by IDs and support
 * Transactions
 */
export declare type TransactionalEntityRepository<T extends Entity, ID, Relations extends object = {}> = TransactionalRepository<T> & EntityCrudRepository<T, ID>;
/**
 * Repository Interface for Repositories that support Transactions
 *
 * @typeParam T Generic type for the Entity
 */
export interface TransactionalRepository<T extends Entity> extends Repository<T> {
    /**
     * Begin a new Transaction
     * @param options - Options for the operations
     * @returns Promise<Transaction> Promise that resolves to a new Transaction
     * object
     */
    beginTransaction(options?: IsolationLevel | Options): Promise<Transaction>;
}
/**
 * Basic CRUD operations for ValueObject and Entity. No ID is required.
 */
export interface CrudRepository<T extends ValueObject | Entity, Relations extends object = {}> extends Repository<T> {
    /**
     * Create a new record
     * @param dataObject - The data to be created
     * @param options - Options for the operations
     * @returns A promise of record created
     */
    create(dataObject: DataObject<T>, options?: Options): Promise<T>;
    /**
     * Create all records
     * @param dataObjects - An array of data to be created
     * @param options - Options for the operations
     * @returns A promise of an array of records created
     */
    createAll(dataObjects: DataObject<T>[], options?: Options): Promise<T[]>;
    /**
     * Find matching records
     * @param filter - Query filter
     * @param options - Options for the operations
     * @returns A promise of an array of records found
     */
    find(filter?: Filter<T>, options?: Options): Promise<(T & Relations)[]>;
    /**
     * Updating matching records with attributes from the data object
     * @param dataObject - The data to be updated
     * @param where - Matching criteria
     * @param options - Options for the operations
     * @returns A promise of number of records updated
     */
    updateAll(dataObject: DataObject<T>, where?: Where<T>, options?: Options): Promise<Count>;
    /**
     * Delete matching records
     * @param where - Matching criteria
     * @param options - Options for the operations
     * @returns A promise of number of records deleted
     */
    deleteAll(where?: Where<T>, options?: Options): Promise<Count>;
    /**
     * Count matching records
     * @param where - Matching criteria
     * @param options - Options for the operations
     * @returns A promise of number of records matched
     */
    count(where?: Where<T>, options?: Options): Promise<Count>;
}
/**
 * Base interface for a repository of entities
 */
export interface EntityRepository<T extends Entity, ID> extends ExecutableRepository<T> {
}
/**
 * CRUD operations for a repository of entities
 */
export interface EntityCrudRepository<T extends Entity, ID, Relations extends object = {}> extends EntityRepository<T, ID>, CrudRepository<T, Relations> {
    entityClass: typeof Entity & {
        prototype: T;
    };
    inclusionResolvers: Map<string, InclusionResolver<T, Entity>>;
    /**
     * Save an entity. If no id is present, create a new entity
     * @param entity - Entity to be saved
     * @param options - Options for the operations
     * @returns A promise that will be resolve if the operation succeeded or will
     * be rejected if the entity was not found.
     */
    save(entity: DataObject<T>, options?: Options): Promise<T>;
    /**
     * Update an entity
     * @param entity - Entity to be updated
     * @param options - Options for the operations
     * @returns A promise that will be resolve if the operation succeeded or will
     * be rejected if the entity was not found.
     */
    update(entity: DataObject<T>, options?: Options): Promise<void>;
    /**
     * Delete an entity
     * @param entity - Entity to be deleted
     * @param options - Options for the operations
     * @returns A promise that will be resolve if the operation succeeded or will
     * be rejected if the entity was not found.
     */
    delete(entity: DataObject<T>, options?: Options): Promise<void>;
    /**
     * Find an entity by id, return a rejected promise if not found.
     *
     * @remarks
     *
     * The rationale behind findById is to find an instance by its primary key
     * (id). No other search criteria than id should be used. If a client wants
     * to use a `where` clause beyond id, use `find` or `findOne` instead.
     *
     * @param id - Value for the entity id
     * @param filter - Additional query options. E.g. `filter.include` configures
     * which related models to fetch as part of the database query (or queries).
     * @param options - Options for the operations
     * @returns A promise of an entity found for the id
     */
    findById(id: ID, filter?: FilterExcludingWhere<T>, options?: Options): Promise<T & Relations>;
    /**
     * Update an entity by id with property/value pairs in the data object
     * @param id - Value for the entity id
     * @param data - Data attributes to be updated
     * @param options - Options for the operations
     * @returns A promise that will be resolve if the operation succeeded or will
     * be rejected if the entity was not found.
     */
    updateById(id: ID, data: DataObject<T>, options?: Options): Promise<void>;
    /**
     * Replace an entity by id
     * @param id - Value for the entity id
     * @param data - Data attributes to be replaced
     * @param options - Options for the operations
     * @returns A promise that will be resolve if the operation succeeded or will
     * be rejected if the entity was not found.
     */
    replaceById(id: ID, data: DataObject<T>, options?: Options): Promise<void>;
    /**
     * Delete an entity by id
     * @param id - Value for the entity id
     * @param options - Options for the operations
     * @returns A promise that will be resolve if the operation succeeded or will
     * be rejected if the entity was not found.
     */
    deleteById(id: ID, options?: Options): Promise<void>;
    /**
     * Check if an entity exists for the given id
     * @param id - Value for the entity id
     * @param options - Options for the operations
     * @returns Promise<true> if an entity exists for the id, otherwise
     * Promise<false>
     */
    exists(id: ID, options?: Options): Promise<boolean>;
}
/**
 * Repository implementation
 *
 * @example
 *
 * User can import `CrudRepositoryImpl` and call its functions like:
 * `CrudRepositoryImpl.find(somefilters, someoptions)`
 *
 * Or extend class `CrudRepositoryImpl` and override its functions:
 * ```ts
 * export class TestRepository extends CrudRepositoryImpl<Test> {
 *   constructor(dataSource: DataSource, model: Test) {
 *     super(dataSource, Customer);
 *   }
 *
 *   // Override `deleteAll` to disable the operation
 *   deleteAll(where?: Where, options?: Options) {
 *     return Promise.reject(new Error('deleteAll is disabled'));
 *   }
 * }
 * ```
 */
export declare class CrudRepositoryImpl<T extends Entity, ID> implements EntityCrudRepository<T, ID> {
    dataSource: DataSource;
    entityClass: typeof Entity & {
        prototype: T;
    };
    private connector;
    readonly inclusionResolvers: Map<string, InclusionResolver<T, Entity>>;
    constructor(dataSource: DataSource, entityClass: typeof Entity & {
        prototype: T;
    });
    private toModels;
    private toModel;
    create(entity: DataObject<T>, options?: Options): Promise<T>;
    createAll(entities: DataObject<T>[], options?: Options): Promise<T[]>;
    save(entity: DataObject<T>, options?: Options): Promise<T>;
    find(filter?: Filter<T>, options?: Options): Promise<T[]>;
    findById(id: ID, filter?: FilterExcludingWhere<T>, options?: Options): Promise<T>;
    update(entity: DataObject<T>, options?: Options): Promise<void>;
    delete(entity: DataObject<T>, options?: Options): Promise<void>;
    updateAll(data: DataObject<T>, where?: Where<T>, options?: Options): Promise<Count>;
    updateById(id: ID, data: DataObject<T>, options?: Options): Promise<void>;
    replaceById(id: ID, data: DataObject<T>, options?: Options): Promise<void>;
    deleteAll(where?: Where<T>, options?: Options): Promise<Count>;
    deleteById(id: ID, options?: Options): Promise<void>;
    count(where?: Where<T>, options?: Options): Promise<Count>;
    exists(id: ID, options?: Options): Promise<boolean>;
    execute(command: Command, parameters: NamedParameters | PositionalParameters, options?: Options): Promise<AnyObject>;
}
