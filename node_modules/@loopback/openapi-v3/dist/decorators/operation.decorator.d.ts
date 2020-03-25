import { OperationObject } from '../types';
/**
 * Expose a Controller method as a REST API operation
 * mapped to `GET` request method.
 *
 * @param path - The URL path of this operation, e.g. `/product/{id}`
 * @param spec - The OpenAPI specification describing parameters and responses
 *   of this operation.
 */
export declare function get(path: string, spec?: OperationObject): MethodDecorator;
/**
 * Expose a Controller method as a REST API operation
 * mapped to `POST` request method.
 *
 * @param path - The URL path of this operation, e.g. `/product/{id}`
 * @param spec - The OpenAPI specification describing parameters and responses
 *   of this operation.
 */
export declare function post(path: string, spec?: OperationObject): MethodDecorator;
/**
 * Expose a Controller method as a REST API operation
 * mapped to `PUT` request method.
 *
 * @param path - The URL path of this operation, e.g. `/product/{id}`
 * @param spec - The OpenAPI specification describing parameters and responses
 *   of this operation.
 */
export declare function put(path: string, spec?: OperationObject): MethodDecorator;
/**
 * Expose a Controller method as a REST API operation
 * mapped to `PATCH` request method.
 *
 * @param path - The URL path of this operation, e.g. `/product/{id}`
 * @param spec - The OpenAPI specification describing parameters and responses
 *   of this operation.
 */
export declare function patch(path: string, spec?: OperationObject): MethodDecorator;
/**
 * Expose a Controller method as a REST API operation
 * mapped to `DELETE` request method.
 *
 * @param path - The URL path of this operation, e.g. `/product/{id}`
 * @param spec - The OpenAPI specification describing parameters and responses
 *   of this operation.
 */
export declare function del(path: string, spec?: OperationObject): MethodDecorator;
/**
 * Expose a Controller method as a REST API operation.
 *
 * @param verb - HTTP verb, e.g. `GET` or `POST`.
 * @param path - The URL path of this operation, e.g. `/product/{id}`
 * @param spec - The OpenAPI specification describing parameters and responses
 *   of this operation.
 */
export declare function operation(verb: string, path: string, spec?: OperationObject): MethodDecorator;
