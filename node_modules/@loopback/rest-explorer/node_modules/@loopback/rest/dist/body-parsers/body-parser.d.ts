/// <reference types="express" />
import { Context } from '@loopback/context';
import { OperationObject } from '@loopback/openapi-v3';
import { Request } from '../types';
import { BodyParser, RequestBody } from './types';
export declare class RequestBodyParser {
    private readonly ctx?;
    readonly parsers: BodyParser[];
    constructor(parsers?: BodyParser[], ctx?: Context | undefined);
    loadRequestBodyIfNeeded(operationSpec: OperationObject, request: Request): Promise<RequestBody>;
    /**
     * Match the http request to a given media type of the request body spec
     */
    private _matchRequestBodySpec;
    /**
     * Find a body parser that supports the media type
     * @param matchedMediaType - Media type
     */
    private _findParser;
    /**
     * Resolve and invoke a custom parser
     * @param customParser - The parser name, class or function
     * @param request - Http request
     */
    private _invokeCustomParser;
}
