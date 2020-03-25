/// <reference types="express" />
import { Request } from '../types';
import { ResolvedRoute, RouteEntry } from './route-entry';
import { RestRouter, RestRouterOptions } from './rest-router';
/**
 * Base router implementation that only handles path without variables
 */
export declare abstract class BaseRouter implements RestRouter {
    protected options: RestRouterOptions;
    /**
     * A map to optimize matching for routes without variables in the path
     */
    protected routesWithoutPathVars: {
        [key: string]: RouteEntry;
    };
    constructor(options?: RestRouterOptions);
    protected getKeyForRoute(route: RouteEntry): string;
    add(route: RouteEntry): void;
    protected getKeyForRequest(request: Request): string;
    find(request: Request): ResolvedRoute | undefined;
    private findRoute;
    list(): RouteEntry[];
    /**
     * Build a key for verb+path as `/<verb>/<path>`
     * @param verb - HTTP verb/method
     * @param path - URL path
     */
    protected getKey(verb: string, path: string): string;
    /**
     * Add a route with path variables
     * @param route - Route
     */
    protected abstract addRouteWithPathVars(route: RouteEntry): void;
    /**
     * Find a route with path variables for a given request
     * @param request - Http request
     */
    protected abstract findRouteWithPathVars(verb: string, path: string): ResolvedRoute | undefined;
    /**
     * List routes with path variables
     */
    protected abstract listRoutesWithPathVars(): RouteEntry[];
}
