/// <reference types="express" />
import { OperationRetval, Response } from './types';
/**
 * Writes the result from Application controller method
 * into the HTTP response
 *
 * @param response - HTTP Response
 * @param result - Result from the API to write into HTTP Response
 */
export declare function writeResultToResponse(response: Response, result: OperationRetval): void;
