import { FilterSchemaOptions, Model } from '@loopback/repository-json-schema';
import { ParameterLocation, ParameterObject, ReferenceObject, SchemaObject } from '../types';
/**
 * Describe an input parameter of a Controller method.
 *
 * `@param` must be applied to parameters.
 *
 * @example
 * ```ts
 * class MyController {
 *   @get('/')
 *   list(
 *     @param(offsetSpec) offset?: number,
 *     @param(pageSizeSpec) pageSize?: number,
 *   ) {}
 * }
 * ```
 *
 * @param paramSpec - Parameter specification.
 */
export declare function param(paramSpec: ParameterObject): (target: object, member: string, index: number) => void;
/**
 * Namespace for `@param.*` decorators
 */
export declare namespace param {
    /**
     * Query parameter decorator
     */
    const query: {
        /**
         * Define a parameter of "integer" type that's read from the query string.
         * Usage: ` @param.query.string('paramName')`
         *
         * @param name - Parameter name.
         */
        string: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        /**
         * Define a parameter of "number" type that's read from the query string.
         * Usage: ` @param.query.number('paramName')`
         *
         * @param name - Parameter name.
         */
        number: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        /**
         * Define a parameter of "boolean" type that's read from the query string.
         * Usage: ` @param.query.boolean('paramName')`
         *
         * @param name - Parameter name.
         */
        boolean: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        /**
         * Define a parameter of "integer" type that's read from the query string.
         * Usage: ` @param.query.integer('paramName')`
         *
         * @param name - Parameter name.
         */
        integer: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        /**
         * Define a parameter of "long" type that's read from the query string.
         * Usage: ` @param.query.long('paramName')`
         *
         * @param name - Parameter name.
         */
        long: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        /**
         * Define a parameter of "float" type that's read from the query string.
         * Usage: ` @param.query.float('paramName')`
         *
         * @param name - Parameter name.
         */
        float: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        /**
         * Define a parameter of "double" type that's read from the query string.
         * Usage: ` @param.query.double('paramName')`
         *
         * @param name - Parameter name.
         */
        double: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        /**
         * Define a parameter of "byte" type that's read from the query string.
         * Usage: ` @param.query.byte('paramName')`
         *
         * @param name - Parameter name.
         */
        byte: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        /**
         * Define a parameter of "binary" type that's read from the query string.
         * Usage: ` @param.query.binary('paramName')`
         *
         * @param name - Parameter name.
         */
        binary: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        /**
         * Define a parameter of "date" type that's read from the query string.
         * Usage: ` @param.query.date('paramName')`
         *
         * @param name - Parameter name.
         */
        date: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        /**
         * Define a parameter of "dateTime" type that's read from the query string.
         * Usage: ` @param.query.dateTime('paramName')`
         *
         * @param name - Parameter name.
         */
        dateTime: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        /**
         * Define a parameter of "password" type that's read from the query string.
         * Usage: ` @param.query.password('paramName')`
         *
         * @param name - Parameter name.
         */
        password: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        /**
         * Define a parameter accepting an object value encoded
         * - as a JSON string, e.g. `filter={"where":{"id":1}}`); or
         * - in multiple nested keys, e.g. `filter[where][id]=1`
         *
         * @param name - Parameter name
         * @param schema - Optional OpenAPI Schema describing the object value.
         */
        object: (name: string, schema?: SchemaObject | ReferenceObject, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
    };
    /**
     * Header parameter decorator
     */
    const header: {
        /**
         * Define a parameter of "string" type that's read from a request header.
         * Usage: ` @param.header.string('paramName')`
         *
         * @param name - Parameter name, it must match the header name
         * (e.g. `Content-Type`).
         */
        string: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        /**
         * Define a parameter of "number" type that's read from a request header.
         * Usage: ` @param.header.number('paramName')`
         *
         * @param name - Parameter name, it must match the header name
         * (e.g. `Content-Length`).
         */
        number: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        /**
         * Define a parameter of "boolean" type that's read from a request header.
         * Usage: ` @param.header.boolean('paramName')`
         *
         * @param name - Parameter name, it must match the header name
         * (e.g. `DNT` or `X-Do-Not-Track`).
         */
        boolean: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        /**
         * Define a parameter of "integer" type that's read from a request header.
         * Usage: ` @param.header.integer('paramName')`
         *
         * @param name - Parameter name, it must match the header name
         * (e.g. `Content-Length`).
         */
        integer: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        /**
         * Define a parameter of "long" type that's read from a request header.
         * Usage: ` @param.header.long('paramName')`
         *
         * @param name - Parameter name, it must match the header name
         */
        long: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        /**
         * Define a parameter of "float" type that's read from a request header.
         * Usage: ` @param.header.float('paramName')`
         *
         * @param name - Parameter name, it must match the header name
         */
        float: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        /**
         * Define a parameter of "double" type that's read from a request header.
         * Usage: ` @param.header.double('paramName')`
         *
         * @param name - Parameter name, it must match the header name
         */
        double: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        /**
         * Define a parameter of "byte" type that's read from a request header.
         * Usage: ` @param.header.byte('paramName')`
         *
         * @param name - Parameter name, it must match the header name
         */
        byte: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        /**
         * Define a parameter of "binary" type that's read from a request header.
         * Usage: ` @param.header.binary('paramName')`
         *
         * @param name - Parameter name, it must match the header name
         */
        binary: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        /**
         * Define a parameter of "date" type that's read from a request header.
         * Usage: ` @param.header.date('paramName')`
         *
         * @param name - Parameter name, it must match the header name
         */
        date: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        /**
         * Define a parameter of "dateTime" type that's read from a request header.
         * Usage: ` @param.header.dateTime('paramName')`
         *
         * @param name - Parameter name, it must match the header name
         */
        dateTime: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        /**
         * Define a parameter of "password" type that's read from a request header.
         * Usage: ` @param.header.password('paramName')`
         *
         * @param name - Parameter name, it must match the header name
         */
        password: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
    };
    /**
     * Path parameter decorator
     */
    const path: {
        /**
         * Define a parameter of "string" type that's read from request path.
         * Usage: ` @param.path.string('paramName')`
         *
         * @param name - Parameter name matching one of the placeholders in the path
         */
        string: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        /**
         * Define a parameter of "number" type that's read from request path.
         * Usage: ` @param.path.number('paramName')`
         *
         * @param name - Parameter name matching one of the placeholders in the path
         */
        number: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        /**
         * Define a parameter of "boolean" type that's read from request path.
         * Usage: ` @param.path.boolean('paramName')`
         *
         * @param name - Parameter name matching one of the placeholders in the path
         */
        boolean: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        /**
         * Define a parameter of "integer" type that's read from request path.
         * Usage: ` @param.path.integer('paramName')`
         *
         * @param name - Parameter name matching one of the placeholders in the path
         */
        integer: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        /**
         * Define a parameter of "long" type that's read from request path.
         * Usage: ` @param.path.long('paramName')`
         *
         * @param name - Parameter name matching one of the placeholders in the path
         */
        long: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        /**
         * Define a parameter of "float" type that's read from request path.
         * Usage: ` @param.path.float('paramName')`
         *
         * @param name - Parameter name matching one of the placeholders in the path
         */
        float: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        /**
         * Define a parameter of "double" type that's read from request path.
         * Usage: ` @param.path.double('paramName')`
         *
         * @param name - Parameter name matching one of the placeholders in the path
         */
        double: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        /**
         * Define a parameter of "byte" type that's read from request path.
         * Usage: ` @param.path.byte('paramName')`
         *
         * @param name - Parameter name matching one of the placeholders in the path
         */
        byte: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        /**
         * Define a parameter of "binary" type that's read from request path.
         * Usage: ` @param.path.binary('paramName')`
         *
         * @param name - Parameter name matching one of the placeholders in the path
         */
        binary: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        /**
         * Define a parameter of "date" type that's read from request path.
         * Usage: ` @param.path.date('paramName')`
         *
         * @param name - Parameter name matching one of the placeholders in the path
         */
        date: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        /**
         * Define a parameter of "dateTime" type that's read from request path.
         * Usage: ` @param.path.dateTime('paramName')`
         *
         * @param name - Parameter name matching one of the placeholders in the path
         */
        dateTime: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        /**
         * Define a parameter of "password" type that's read from request path.
         * Usage: ` @param.path.password('paramName')`
         *
         * @param name - Parameter name matching one of the placeholders in the path
         */
        password: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
    };
    /**
     * Define a parameter of `array` type.
     *
     * @example
     * ```ts
     * export class MyController {
     *   @get('/greet')
     *   greet(@param.array('names', 'query', {type: 'string'}) names: string[]): string {
     *     return `Hello, ${names}`;
     *   }
     * }
     * ```
     *
     * @param name - Parameter name
     * @param source - Source of the parameter value
     * @param itemSpec - Item type for the array or the full item object
     */
    const array: (name: string, source: ParameterLocation, itemSpec: SchemaObject | ReferenceObject) => (target: object, member: string, index: number) => void;
    /**
     * Sugar decorator for `filter` query parameter
     *
     * @example
     * ```ts
     * async find(
     *   @param.filter(modelCtor)) filter?: Filter<T>,
     * ): Promise<(T & Relations)[]> {
     *   // ...
     * }
     * ```
     * @param modelCtor - Model class
     * @param options - Options to customize the parameter name or filter schema
     *
     */
    function filter(modelCtor: typeof Model, options?: string | (FilterSchemaOptions & {
        name?: string;
    })): (target: object, member: string, index: number) => void;
    /**
     * Sugar decorator for `where` query parameter
     *
     * @example
     * ```ts
     * async count(
     *   @param.where(modelCtor)) where?: Where<T>,
     * ): Promise<Count> {
     *   // ...
     * }
     * ```
     * @param modelCtor - Model class
     * @param name - Custom name for the parameter, default to `where`
     *
     */
    function where(modelCtor: typeof Model, name?: string): (target: object, member: string, index: number) => void;
}
