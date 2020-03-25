import { SchemaObject } from './types';
/**
 * Generate the `type` and `format` property in a Schema Object according to a
 * parameter's type.
 * `type` and `format` will be preserved if provided in `schema`
 *
 * @internal
 * @param type - The JavaScript type of a parameter
 * @param schema - The schema object provided in an parameter object
 */
export declare function resolveSchema(fn?: Function, schema?: SchemaObject): SchemaObject;
