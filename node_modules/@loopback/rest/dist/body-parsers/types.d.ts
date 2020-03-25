/// <reference types="express" />
import { ReferenceObject, SchemaObject } from '@loopback/openapi-v3';
import { Request } from '../types';
/**
 * Request body with metadata
 */
export declare type RequestBody = {
    /**
     * Parsed value of the request body
     */
    value: any | undefined;
    /**
     * Is coercion required? Some forms of request such as urlencoded don't
     * have rich types such as number or boolean.
     */
    coercionRequired?: boolean;
    /**
     * Resolved media type
     */
    mediaType?: string;
    /**
     * Corresponding schema for the request body
     */
    schema?: SchemaObject | ReferenceObject;
};
/**
 * Interface to be implemented by body parser extensions
 */
export interface BodyParser {
    /**
     * Name of the parser
     */
    name: string | symbol;
    /**
     * Indicate if the given media type is supported
     * @param mediaType - Media type
     */
    supports(mediaType: string): boolean;
    /**
     * Parse the request body
     * @param request - http request
     */
    parse(request: Request): Promise<RequestBody>;
}
/**
 * Plain function for body parsing
 */
export declare type BodyParserFunction = (request: Request) => Promise<RequestBody>;
/**
 * Binding tag for request body parser extensions
 */
export declare const REQUEST_BODY_PARSER_TAG = "rest.requestBodyParser";
