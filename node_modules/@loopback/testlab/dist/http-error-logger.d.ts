import { Request } from 'express';
/**
 * Creates a Logger that logs an Error if the HTTP status code is not expected
 *
 * @param expectedStatusCode - HTTP status code that is expected
 */
export declare function createUnexpectedHttpErrorLogger(expectedStatusCode?: number): LogError;
declare type LogError = (err: Error, statusCode: number, request: Request) => void;
export {};
