/// <reference types="express" />
import { ControllerSpec, PathObject } from '@loopback/openapi-v3';
import { Request } from '../types';
import { ControllerClass, ControllerFactory } from './controller-route';
import { ExternalExpressRoutes } from './external-express-routes';
import { RestRouter } from './rest-router';
import { ResolvedRoute, RouteEntry } from './route-entry';
/**
 * Routing table
 */
export declare class RoutingTable {
    private readonly _router;
    private _externalRoutes?;
    constructor(_router?: RestRouter, _externalRoutes?: ExternalExpressRoutes | undefined);
    /**
     * Register a controller as the route
     * @param spec
     * @param controllerCtor
     * @param controllerFactory
     */
    registerController<T>(spec: ControllerSpec, controllerCtor: ControllerClass<T>, controllerFactory?: ControllerFactory<T>): void;
    /**
     * Register a route
     * @param route - A route entry
     */
    registerRoute(route: RouteEntry): void;
    describeApiPaths(): PathObject;
    /**
     * Map a request to a route
     * @param request
     */
    find(request: Request): ResolvedRoute;
}
