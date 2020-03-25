/// <reference types="express" />
import { Request, RequestBodyParserOptions } from '../types';
import { BodyParser, RequestBody } from './types';
/**
 * Parsing the request body into Buffer
 */
export declare class RawBodyParser implements BodyParser {
    name: symbol;
    private rawParser;
    constructor(options?: RequestBodyParserOptions);
    supports(mediaType: string): boolean;
    parse(request: Request): Promise<RequestBody>;
}
