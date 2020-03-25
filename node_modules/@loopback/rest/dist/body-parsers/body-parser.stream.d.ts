/// <reference types="express" />
import { Request } from '../types';
import { BodyParser, RequestBody } from './types';
/**
 * A special body parser to retain request stream as is.
 * It will be used by explicitly setting `x-parser` to `'stream'` in the request
 * body spec.
 */
export declare class StreamBodyParser implements BodyParser {
    name: symbol;
    supports(mediaType: string): boolean;
    parse(request: Request): Promise<RequestBody>;
}
