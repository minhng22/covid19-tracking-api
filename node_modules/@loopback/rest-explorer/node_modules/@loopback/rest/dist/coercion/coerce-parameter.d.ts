import { ParameterObject } from '@loopback/openapi-v3';
/**
 * Coerce the http raw data to a JavaScript type data of a parameter
 * according to its OpenAPI schema specification.
 *
 * @param data - The raw data get from http request
 * @param schema - The parameter's schema defined in OpenAPI specification
 */
export declare function coerceParameter(data: string | undefined | object, spec: ParameterObject): string | number | boolean | object | undefined;
