/// <reference types="express" />
import { RequestBodyParser } from './body-parsers';
import { ResolvedRoute } from './router';
import { OperationArgs, Request, RequestBodyValidationOptions } from './types';
/**
 * Parses the request to derive arguments to be passed in for the Application
 * controller method
 *
 * @param request - Incoming HTTP request
 * @param route - Resolved Route
 */
export declare function parseOperationArgs(request: Request, route: ResolvedRoute, requestBodyParser?: RequestBodyParser, options?: RequestBodyValidationOptions): Promise<OperationArgs>;
