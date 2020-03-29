"use strict";
// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/rest
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const http_errors_1 = tslib_1.__importDefault(require("http-errors"));
const on_finished_1 = tslib_1.__importDefault(require("on-finished"));
const util_1 = require("util");
const router_spec_1 = require("./router-spec");
/**
 * A registry of external, Express-style routes. These routes are invoked
 * _after_ no LB4 route (controller or handler based) matched the incoming
 * request.
 *
 * @internal
 */
class ExternalExpressRoutes {
    constructor() {
        this._externalRoutes = express_1.default.Router();
        this._staticRoutes = express_1.default.Router();
        this._specForExternalRoutes = { paths: {} };
    }
    get routerSpec() {
        return this._specForExternalRoutes;
    }
    registerAssets(path, rootDir, options) {
        this._staticRoutes.use(path, express_1.default.static(rootDir, options));
    }
    mountRouter(basePath, router, spec = { paths: {} }) {
        this._externalRoutes.use(basePath, router);
        spec = rebaseOpenApiSpec(spec, basePath);
        router_spec_1.assignRouterSpec(this._specForExternalRoutes, spec);
    }
    find(request) {
        return new ExternalRoute(this._externalRoutes, this._staticRoutes, request.method, request.url, {
            description: 'External route or a static asset',
            'x-visibility': 'undocumented',
            responses: {},
        });
    }
}
exports.ExternalExpressRoutes = ExternalExpressRoutes;
class ExternalRoute {
    constructor(_externalRouter, _staticAssets, verb, path, spec) {
        this._externalRouter = _externalRouter;
        this._staticAssets = _staticAssets;
        this.verb = verb;
        this.path = path;
        this.spec = spec;
        // ResolvedRoute API
        this.pathParams = [];
        this.schemas = {};
    }
    updateBindings(requestContext) {
        // no-op
    }
    async invokeHandler({ request, response }, args) {
        let handled = await executeRequestHandler(this._externalRouter, request, response);
        if (handled)
            return;
        handled = await executeRequestHandler(this._staticAssets, request, response);
        if (handled)
            return;
        // Express router called next, which means no route was matched
        throw new http_errors_1.default.NotFound(`Endpoint "${request.method} ${request.path}" not found.`);
    }
    describe() {
        // TODO(bajtos) provide better description for Express routes with spec
        return `External Express route "${this.verb} ${this.path}"`;
    }
}
function rebaseOpenApiSpec(spec, basePath) {
    if (!spec.paths)
        return spec;
    if (!basePath || basePath === '/')
        return spec;
    const localPaths = spec.paths;
    // Don't modify the spec object provided to us.
    spec = Object.assign({}, spec);
    spec.paths = {};
    for (const url in localPaths) {
        spec.paths[`${basePath}${url}`] = localPaths[url];
    }
    return spec;
}
exports.rebaseOpenApiSpec = rebaseOpenApiSpec;
const onFinishedAsync = util_1.promisify(on_finished_1.default);
/**
 * Execute an Express-style callback-based request handler.
 *
 * @param handler
 * @param request
 * @param response
 * @returns A promise resolved to:
 * - `true` when the request was handled
 * - `false` when the handler called `next()` to proceed to the next
 *    handler (middleware) in the chain.
 */
function executeRequestHandler(handler, request, response) {
    const responseWritten = onFinishedAsync(response).then(() => true);
    const handlerFinished = new Promise((resolve, reject) => {
        handler(request, response, err => {
            if (err) {
                reject(err);
            }
            else {
                // Express router called next, which means no route was matched
                resolve(false);
            }
        });
    });
    return Promise.race([handlerFinished, responseWritten]);
}
//# sourceMappingURL=external-express-routes.js.map