import { ReferenceObject, RequestBodyObject, SchemaObject } from '../types';
export declare const REQUEST_BODY_INDEX = "x-parameter-index";
/**
 * Describe the request body of a Controller method parameter.
 *
 * A typical OpenAPI requestBody spec contains property:
 * - `description`
 * - `required`
 * - `content`.
 *
 * @example
 * ```ts
 * requestBodySpec: {
 *   description: 'a user',
 *   required: true,
 *   content: {
 *     'application/json': {...schemaSpec},
 *     'application/text': {...schemaSpec},
 *   },
 * }
 * ```
 *
 * If the `content` object is not provided, this decorator sets it
 * as `application/json` by default.
 * If the `schema` object is not provided in a media type, this decorator
 * generates it for you based on the argument's type. In this case, please
 * make sure the argument type is a class decorated by `@model` from
 * `@loopback/repository`
 *
 * The simplest usage is:
 *
 * ```ts
 * class MyController {
 *   @post('/User')
 *   async create(@requestBody() user: User) {}
 * }
 * ```
 *
 * or with properties other than `content`
 *
 * ```ts
 * class MyController {
 *   @post('/User')
 *   async create(@requestBody({description: 'a user'}) user: User) {}
 * }
 * ```
 *
 * or to be more complicated, with your customized media type
 *
 * ```ts
 * class MyController {
 *   @post('/User')
 *   async create(@requestBody({
 *     description: 'a user',
 *     // leave the schema as empty object, the decorator will generate it.
 *     content: {'application/text': {}}
 *   }) user: User) {}
 * }
 * ```
 *
 * @param requestBodySpec - The complete requestBody object or partial of it.
 * "partial" for allowing no `content` in spec, for example:
 * ```
 * @requestBody({description: 'a request body'}) user: User
 * ```
 */
export declare function requestBody(requestBodySpec?: Partial<RequestBodyObject>): (target: object, member: string, index: number) => void;
export declare namespace requestBody {
    /**
     * Define a requestBody of `array` type.
     *
     * @example
     * ```ts
     * export class MyController {
     *   @post('/greet')
     *   greet(@requestBody.array(
     *     {schema: {type: 'string'}},
     *     {description: 'an array of names', required: false}
     *   ) names: string[]): string {
     *     return `Hello, ${names}`;
     *   }
     * }
     * ```
     *
     * @param properties - The requestBody properties other than `content`
     * @param itemSpec - the full item object
     */
    const array: (itemSpec: SchemaObject | ReferenceObject, properties?: {
        description?: string | undefined;
        required?: boolean | undefined;
    } | undefined) => (target: object, member: string, index: number) => void;
    /**
     * Define a requestBody of `file` type. This is used to support
     * multipart/form-data based file upload. Use `@requestBody` for other content
     * types.
     *
     * {@link https://swagger.io/docs/specification/describing-request-body/file-upload | OpenAPI file upload}
     *
     * @example
     * import {Request} from '@loopback/rest';
     *
     * ```ts
     * class MyController {
     *   @post('/pictures')
     *   upload(
     *     @requestBody.file()
     *     request: Request,
     *   ) {
     *     // ...
     *   }
     * }
     * ```
     *
     * @param properties - Optional description and required flag
     */
    const file: (properties?: {
        description?: string | undefined;
        required?: boolean | undefined;
    } | undefined) => (target: object, member: string, index: number) => void;
}
