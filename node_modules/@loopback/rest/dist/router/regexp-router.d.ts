import { RestRouterOptions } from './rest-router';
import { ResolvedRoute, RouteEntry } from './route-entry';
import { BaseRouter } from './router-base';
import { Key } from 'path-to-regexp';
/**
 * Route entry with path-to-regexp
 */
interface RegExpRouteEntry extends RouteEntry {
    regexp: RegExp;
    keys: Key[];
}
/**
 * Router implementation based on regexp matching
 */
export declare class RegExpRouter extends BaseRouter {
    private routes;
    private _sorted;
    private _sort;
    constructor(options?: RestRouterOptions);
    protected addRouteWithPathVars(route: RouteEntry): void;
    protected findRouteWithPathVars(verb: string, path: string): ResolvedRoute | undefined;
    protected listRoutesWithPathVars(): RegExpRouteEntry[];
    private _buildPathParams;
}
export {};
