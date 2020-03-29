import { FilterSchemaOptions, Model } from '@loopback/repository-json-schema';
import { SchemaObject } from './types';
/**
 * Build an OpenAPI schema describing the format of the "filter" object
 * used to query model instances.
 *
 * Note we don't take the model properties into account yet and return
 * a generic json schema allowing any "where" condition.
 *
 * @param modelCtor - The model constructor to build the filter schema for.
 * @param options - Options to build the filter schema.
 */
export declare function getFilterSchemaFor(modelCtor: typeof Model, options?: FilterSchemaOptions): SchemaObject;
/**
 * Build a OpenAPI schema describing the format of the "where" object
 * used to filter model instances to query, update or delete.
 *
 * Note we don't take the model properties into account yet and return
 * a generic json schema allowing any "where" condition.
 *
 * @param modelCtor - The model constructor to build the filter schema for.
 */
export declare function getWhereSchemaFor(modelCtor: typeof Model): SchemaObject;
