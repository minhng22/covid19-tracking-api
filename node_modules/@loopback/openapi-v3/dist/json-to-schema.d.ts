import { JsonSchema } from '@loopback/repository-json-schema';
import { ReferenceObject, SchemaObject, SchemasObject } from './types';
/**
 * Custom LoopBack extension: a reference to Schema object that's bundled
 * inside `definitions` property.
 *
 * @example
 *
 * ```ts
 * const spec: SchemaRef = {
 *   $ref: '/components/schemas/Product',
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
 */
export declare type SchemaRef = ReferenceObject & {
    definitions: SchemasObject;
};
/**
 * Converts JSON Schemas into a SchemaObject
 * @param json - JSON Schema to convert from
 * @param visited - A map to keep track of mapped json schemas to handle
 * circular references
 */
export declare function jsonToSchemaObject(json: JsonSchema, visited?: Map<JsonSchema, SchemaObject | SchemaRef>): SchemaObject | SchemaRef;
/**
 * Helper function used to interpret boolean values as JSON Schemas.
 * See http://json-schema.org/draft-06/json-schema-release-notes.html
 * @param jsonOrBool - converts boolean values into their representative JSON Schemas
 * @returns A JSON Schema document representing the input value.
 */
export declare function jsonOrBooleanToJSON(jsonOrBool: boolean | JsonSchema): JsonSchema;
