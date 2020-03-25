import { JsonSchemaOptions } from '@loopback/repository-json-schema';
import { SchemaRef } from './json-to-schema';
import { ComponentsObject, OperationObject, PathObject } from './types';
export interface ControllerSpec {
    /**
     * The base path on which the Controller API is served.
     * If it is not included, the API is served directly under the host.
     * The value MUST start with a leading slash (/).
     */
    basePath?: string;
    /**
     * The available paths and operations for the API.
     */
    paths: PathObject;
    /**
     * OpenAPI components.schemas generated from model metadata
     */
    components?: ComponentsObject;
}
/**
 * Data structure for REST related metadata
 */
export interface RestEndpoint {
    verb: string;
    path: string;
    spec?: OperationObject;
}
export declare const TS_TYPE_KEY = "x-ts-type";
/**
 * Get the controller spec for the given class
 * @param constructor - Controller class
 */
export declare function getControllerSpec(constructor: Function): ControllerSpec;
/**
 * Describe the provided Model as a reference to a definition shared by multiple
 * endpoints. The definition is included in the returned schema.
 *
 * @example
 *
 * ```ts
 * const schema = {
 *   $ref: '#/components/schemas/Product',
 *   definitions: {
 *     Product: {
 *       title: 'Product',
 *       properties: {
 *         // etc.
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * @param modelCtor - The model constructor (e.g. `Product`)
 * @param options - Additional options
 */
export declare function getModelSchemaRef<T extends object>(modelCtor: Function & {
    prototype: T;
}, options?: JsonSchemaOptions<T>): SchemaRef;
