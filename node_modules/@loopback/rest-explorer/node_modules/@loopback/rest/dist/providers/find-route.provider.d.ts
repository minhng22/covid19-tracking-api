/// <reference types="express" />
import { Context, Provider } from '@loopback/context';
import { FindRoute, Request } from '../types';
import { HttpHandler } from '../http-handler';
import { ResolvedRoute } from '../router';
export declare class FindRouteProvider implements Provider<FindRoute> {
    protected context: Context;
    protected handler: HttpHandler;
    constructor(context: Context, handler: HttpHandler);
    value(): FindRoute;
    action(request: Request): ResolvedRoute;
}
