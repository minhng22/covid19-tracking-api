"use strict";
// Copyright IBM Corp. 2017,2020. All Rights Reserved.
// Node module: @loopback/rest
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const http_errors_1 = tslib_1.__importDefault(require("http-errors"));
const controller_route_1 = require("./controller-route");
const openapi_path_1 = require("./openapi-path");
const trie_router_1 = require("./trie-router");
const debug = debug_1.default('loopback:rest:routing-table');
/**
 * Routing table
 */
class RoutingTable {
    constructor(_router = new trie_router_1.TrieRouter(), _externalRoutes) {
        this._router = _router;
        this._externalRoutes = _externalRoutes;
    }
    /**
     * Register a controller as the route
     * @param spec
     * @param controllerCtor
     * @param controllerFactory
     */
    registerController(spec, controllerCtor, controllerFactory) {
        const routes = controller_route_1.createRoutesForController(spec, controllerCtor, controllerFactory);
        for (const route of routes) {
            this.registerRoute(route);
        }
    }
    /**
     * Register a route
     * @param route - A route entry
     */
    registerRoute(route) {
        // TODO(bajtos) handle the case where opSpec.parameters contains $ref
        // See https://github.com/strongloop/loopback-next/issues/435
        /* istanbul ignore if */
        if (debug.enabled) {
            debug('Registering route %s %s -> %s(%s)', route.verb.toUpperCase(), route.path, route.describe(), describeOperationParameters(route.spec));
        }
        openapi_path_1.validateApiPath(route.path);
        this._router.add(route);
    }
    describeApiPaths() {
        const paths = {};
        for (const route of this._router.list()) {
            if (route.spec['x-visibility'] === 'undocumented')
                continue;
            if (!paths[route.path]) {
                paths[route.path] = {};
            }
            paths[route.path][route.verb] = route.spec;
        }
        return paths;
    }
    /**
     * Map a request to a route
     * @param request
     */
    find(request) {
        debug('Finding route for %s %s', request.method, request.path);
        const found = this._router.find(request);
        if (found) {
            debug('Route matched: %j', found);
            return found;
        }
        if (this._externalRoutes) {
            debug('No API route found for %s %s, trying to find an external Express route', request.method, request.path);
            return this._externalRoutes.find(request);
        }
        debug('No route found for %s %s', request.method, request.path);
        throw new http_errors_1.default.NotFound(`Endpoint "${request.method} ${request.path}" not found.`);
    }
}
exports.RoutingTable = RoutingTable;
function describeOperationParameters(opSpec) {
    return (opSpec.parameters || [])
        .map(p => (p === null || p === void 0 ? void 0 : p.name) || '')
        .join(', ');
}
//# sourceMappingURL=routing-table.js.map