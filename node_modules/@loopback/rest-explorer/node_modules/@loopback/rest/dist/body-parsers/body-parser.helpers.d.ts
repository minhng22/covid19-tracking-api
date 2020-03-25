/// <reference types="express" />
import { Options, OptionsJson, OptionsText, OptionsUrlencoded } from 'body-parser';
import { HttpError } from 'http-errors';
import { Request, RequestBodyParserOptions, Response } from '../types';
/**
 * Get the content-type header value from the request
 * @param req - Http request
 */
export declare function getContentType(req: Request): string | undefined;
/**
 * Express body parser function type
 */
export declare type BodyParserMiddleware = (request: Request, response: Response, next: (err: HttpError) => void) => void;
/**
 * Normalize parsing errors as `4xx`
 * @param err
 */
export declare function normalizeParsingError(err: HttpError): HttpError;
/**
 * Parse the request body asynchronously
 * @param handle - The express middleware handler
 * @param request - Http request
 */
export declare function invokeBodyParserMiddleware(handle: BodyParserMiddleware, request: Request): Promise<any>;
export declare const DEFAULT_LIMIT = "1mb";
/**
 * Extract parser options based on the parser type
 * @param type - json|urlencoded|text
 * @param options
 */
export declare function getParserOptions(type: 'json', options: RequestBodyParserOptions): OptionsJson;
export declare function getParserOptions(type: 'urlencoded', options: RequestBodyParserOptions): OptionsUrlencoded;
export declare function getParserOptions(type: 'text', options: RequestBodyParserOptions): OptionsText;
export declare function getParserOptions(type: 'raw', options: RequestBodyParserOptions): Options;
export declare namespace builtinParsers {
    const json: unique symbol;
    const urlencoded: unique symbol;
    const text: unique symbol;
    const raw: unique symbol;
    const stream: unique symbol;
    const names: (string | symbol)[];
    const mapping: {
        [name: string]: symbol;
    };
}
