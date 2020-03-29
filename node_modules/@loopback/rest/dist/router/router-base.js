"use strict";
// Copyright IBM Corp. 2018,2019. All Rights Reserved.
// Node module: @loopback/rest
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const openapi_path_1 = require("./openapi-path");
const route_entry_1 = require("./route-entry");
const route_sort_1 = require("./route-sort");
/**
 * Base router implementation that only handles path without variables
 */
class BaseRouter {
    constructor(options = { strict: false }) {
        this.options = options;
        /**
         * A map to optimize matching for routes without variables in the path
         */
        this.routesWithoutPathVars = {};
    }
    getKeyForRoute(route) {
        return this.getKey(route.verb, route.path);
    }
    add(route) {
        if (!openapi_path_1.getPathVariables(route.path)) {
            const key = this.getKeyForRoute(route);
            this.routesWithoutPathVars[key] = route;
        }
        else {
            this.addRouteWithPathVars(route);
        }
    }
    getKeyForRequest(request) {
        return this.getKey(request.method, request.path);
    }
    find(request) {
        if (this.options.strict) {
            return this.findRoute(request.method, request.path);
        }
        // Non-strict mode
        let path = request.path;
        // First try the exact match
        const route = this.findRoute(request.method, path);
        if (route || path === '/')
            return route;
        if (path.endsWith('/')) {
            // Fall back to the path without trailing slash
            path = path.substring(0, path.length - 1);
        }
        else {
            // Fall back to the path with trailing slash
            path = path + '/';
        }
        return this.findRoute(request.method, path);
    }
    findRoute(verb, path) {
        const key = this.getKey(verb, path);
        const route = this.routesWithoutPathVars[key];
        if (route)
            return route_entry_1.createResolvedRoute(route, {});
        else
            return this.findRouteWithPathVars(verb, path);
    }
    list() {
        let routes = Object.values(this.routesWithoutPathVars);
        routes = routes.concat(this.listRoutesWithPathVars());
        // Sort the routes so that they show up in OpenAPI spec in order
        return routes.sort(route_sort_1.compareRoute);
    }
    /**
     * Build a key for verb+path as `/<verb>/<path>`
     * @param verb - HTTP verb/method
     * @param path - URL path
     */
    getKey(verb, path) {
        verb = normalizeVerb(verb);
        path = normalizePath(path);
        return `/${verb}${path}`;
    }
}
exports.BaseRouter = BaseRouter;
/**
 * Normalize http verb to lowercase
 * @param verb - Http verb
 */
function normalizeVerb(verb) {
    // Use lower case, default to `get`
    return (verb === null || verb === void 0 ? void 0 : verb.toLowerCase()) || 'get';
}
/**
 * Normalize path to make sure it starts with `/`
 * @param path - Path
 */
function normalizePath(path) {
    // Prepend `/` if needed
    path = path || '/';
    path = path.startsWith('/') ? path : `/${path}`;
    return path;
}
//# sourceMappingURL=router-base.js.map