import { Class } from '../common-types';
import { DataSource } from '../datasource';
import { Entity, Model } from '../model';
import { Repository } from '../repositories';
import { juggler } from '../repositories/legacy-juggler-bridge';
/**
 * Type definition for decorators returned by `@repository` decorator factory
 */
export declare type RepositoryDecorator = (target: Object, key?: string, descriptorOrIndex?: TypedPropertyDescriptor<any> | number) => void;
/**
 * Metadata for a repository
 */
export declare class RepositoryMetadata {
    /**
     * Name of the predefined repository
     */
    name?: string;
    /**
     * Name of the model
     */
    modelName?: string;
    /**
     * Class of the model
     */
    modelClass?: typeof Entity;
    /**
     * Name of the data source
     */
    dataSourceName?: string;
    /**
     * Instance of the data source
     */
    dataSource?: juggler.DataSource | DataSource;
    /**
     * Constructor for RepositoryMetadata
     *
     * @param modelOrRepo - Name or class of the model. If the value is a string and
     * `dataSource` is not present, it will treated as the name of a predefined
     * repository
     * @param dataSource - Name or instance of the data source
     *
     * For example:
     *
     * - new RepositoryMetadata(repoName);
     * - new RepositoryMetadata(modelName, dataSourceName);
     * - new RepositoryMetadata(modelClass, dataSourceInstance);
     * - new RepositoryMetadata(modelName, dataSourceInstance);
     * - new RepositoryMetadata(modelClass, dataSourceName);
     */
    constructor(modelOrRepo: string | typeof Entity, dataSource?: string | juggler.DataSource | DataSource);
}
/**
 * Decorator for repository injections on properties or method arguments
 *
 * @example
 * ```ts
 * class CustomerController {
 *   @repository(CustomerRepository) public custRepo: CustomerRepository;
 *
 *   constructor(
 *     @repository(ProductRepository) public prodRepo: ProductRepository,
 *   ) {}
 *   // ...
 * }
 * ```
 *
 * @param repositoryName - Name of the repo
 */
export declare function repository(repositoryName: string | Class<Repository<Model>>): RepositoryDecorator;
/**
 * Decorator for DefaultCrudRepository generation and injection on properties
 * or method arguments based on the given model and dataSource (or their names)
 *
 * @example
 * ```ts
 * class CustomerController {
 *   @repository('Customer', 'mySqlDataSource')
 *   public custRepo: DefaultCrudRepository<
 *     Customer,
 *     typeof Customer.prototype.id
 *   >;
 *
 *   constructor(
 *     @repository(Product, mySqlDataSource)
 *     public prodRepo: DefaultCrudRepository<
 *       Product,
 *       typeof Product.prototype.id
 *     >,
 *   ) {}
 *   // ...
 * }
 * ```
 *
 * @param model - Name/class of the model
 * @param dataSource - Name/instance of the dataSource
 */
export declare function repository(model: string | typeof Entity, dataSource: string | juggler.DataSource): RepositoryDecorator;
export declare namespace repository {
    /**
     * Decorator used to inject a Getter for a repository
     * Mainly intended for usage with repository injections on relation repository
     * factory
     * @param nameOrClass - The repository class (ProductRepository) or a string name ('ProductRepository').
     */
    function getter(nameOrClass: string | Class<Repository<Model>>): (target: Object, member: string | undefined, methodDescriptorOrParameterIndex?: number | TypedPropertyDescriptor<any> | undefined) => void;
}
