/**
 * Factory to create a reviver function for `JSON.parse` to sanitize keys
 * @param reviver - Reviver function
 */
export declare function sanitizeJsonParse(reviver?: (key: any, value: any) => any): (key: string, value: any) => any;
/**
 *
 * @param text - JSON string
 * @param reviver - Optional reviver function for `JSON.parse`
 */
export declare function parseJson(text: string, reviver?: (key: any, value: any) => any): any;
