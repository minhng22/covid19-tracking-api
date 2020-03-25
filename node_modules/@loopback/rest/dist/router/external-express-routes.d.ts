import { OpenApiSpec } from '@loopback/openapi-v3';
import express from 'express';
import { PathParams } from 'express-serve-static-core';
import { ServeStaticOptions } from 'serve-static';
import { Request } from '../types';
import { ResolvedRoute } from './route-entry';
import { RouterSpec } from './router-spec';
export declare type ExpressRequestHandler = express.RequestHandler;
/**
 * A registry of external, Express-style routes. These routes are invoked
 * _after_ no LB4 route (controller or handler based) matched the incoming
 * request.
 *
 * @internal
 */
export declare class ExternalExpressRoutes {
    protected _externalRoutes: express.Router;
    protected _staticRoutes: express.Router;
    protected _specForExternalRoutes: RouterSpec;
    get routerSpec(): RouterSpec;
    registerAssets(path: PathParams, rootDir: string, options?: ServeStaticOptions): void;
    mountRouter(basePath: string, router: ExpressRequestHandler, spec?: RouterSpec): void;
    find(request: Request): ResolvedRoute;
}
export declare function rebaseOpenApiSpec<T extends Partial<OpenApiSpec>>(spec: T, basePath: string): T;
