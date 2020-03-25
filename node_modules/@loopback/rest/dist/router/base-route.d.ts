import { Context, InvocationSource } from '@loopback/context';
import { OperationObject } from '@loopback/openapi-v3';
import { OperationArgs, OperationRetval } from '../types';
import { RouteEntry } from './route-entry';
/**
 * Base implementation of RouteEntry
 */
export declare abstract class BaseRoute implements RouteEntry {
    readonly path: string;
    readonly spec: OperationObject;
    readonly verb: string;
    /**
     * Construct a new route
     * @param verb - http verb
     * @param path - http request path pattern
     * @param spec - OpenAPI operation spec
     */
    constructor(verb: string, path: string, spec: OperationObject);
    abstract updateBindings(requestContext: Context): void;
    abstract invokeHandler(requestContext: Context, args: OperationArgs): Promise<OperationRetval>;
    describe(): string;
    toString(): string;
}
export declare class RouteSource implements InvocationSource<RouteEntry> {
    readonly value: RouteEntry;
    type: string;
    constructor(value: RouteEntry);
    toString(): string;
}
