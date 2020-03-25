/// <reference types="express" />
import { Request, RequestBodyParserOptions } from '../types';
import { BodyParser, RequestBody } from './types';
export declare class UrlEncodedBodyParser implements BodyParser {
    name: symbol;
    private urlencodedParser;
    constructor(options?: RequestBodyParserOptions);
    supports(mediaType: string): boolean;
    parse(request: Request): Promise<RequestBody>;
}
