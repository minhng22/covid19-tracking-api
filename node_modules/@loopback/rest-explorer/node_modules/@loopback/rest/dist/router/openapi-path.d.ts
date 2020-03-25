/**
 * Validate the path to be compatible with OpenAPI path template. No parameter
 * modifier, custom pattern, or unnamed parameter is allowed.
 */
export declare function validateApiPath(path?: string): string;
/**
 * Get all path variables. For example, `/root/{foo}/bar` => `['foo']`
 */
export declare function getPathVariables(path: string): RegExpMatchArray | null;
/**
 * Convert an OpenAPI path to Express (path-to-regexp) style
 * @param path - OpenAPI path with optional variables as `{var}`
 */
export declare function toExpressPath(path: string): string;
