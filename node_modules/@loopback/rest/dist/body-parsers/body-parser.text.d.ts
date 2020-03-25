/// <reference types="express" />
import { Request, RequestBodyParserOptions } from '../types';
import { BodyParser, RequestBody } from './types';
export declare class TextBodyParser implements BodyParser {
    name: symbol;
    private textParser;
    constructor(options?: RequestBodyParserOptions);
    supports(mediaType: string): boolean;
    parse(request: Request): Promise<RequestBody>;
}
