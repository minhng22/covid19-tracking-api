/// <reference types="express" />
import { Request, RequestBodyParserOptions } from '../types';
import { BodyParser, RequestBody } from './types';
export declare class JsonBodyParser implements BodyParser {
    name: symbol;
    private jsonParser;
    constructor(options?: RequestBodyParserOptions);
    supports(mediaType: string): boolean;
    parse(request: Request): Promise<RequestBody>;
}
