"use strict";
// Copyright IBM Corp. 2018,2019. All Rights Reserved.
// Node module: @loopback/rest
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@loopback/core");
const util_1 = require("util");
const keys_1 = require("./keys");
const rest_component_1 = require("./rest.component");
exports.ERR_NO_MULTI_SERVER = util_1.format('RestApplication does not support multiple servers!', 'To create your own server bindings, please extend the Application class.');
// To help cut down on verbosity!
exports.SequenceActions = keys_1.RestBindings.SequenceActions;
/**
 * An implementation of the Application class that automatically provides
 * an instance of a REST server. This application class is intended to be
 * a single-server implementation. Any attempt to bind additional servers
 * will throw an error.
 *
 */
class RestApplication extends core_1.Application {
    /**
     * The main REST server instance providing REST API for this application.
     */
    get restServer() {
        // FIXME(kjdelisle): I attempted to mimic the pattern found in RestServer
        // with no success, so until I've got a better way, this is functional.
        return this.getSync('servers.RestServer');
    }
    /**
     * Handle incoming HTTP(S) request by invoking the corresponding
     * Controller method via the configured Sequence.
     *
     * @example
     *
     * ```ts
     * const app = new RestApplication();
     * // setup controllers, etc.
     *
     * const server = http.createServer(app.requestHandler);
     * server.listen(3000);
     * ```
     *
     * @param req - The request.
     * @param res - The response.
     */
    get requestHandler() {
        return this.restServer.requestHandler;
    }
    constructor(configOrParent, parent) {
        super(configOrParent, parent);
        this.component(rest_component_1.RestComponent);
    }
    server(server, name) {
        if (this.findByTag('server').length > 0) {
            throw new Error(exports.ERR_NO_MULTI_SERVER);
        }
        return super.server(server, name);
    }
    sequence(sequence) {
        return this.bind(keys_1.RestBindings.SEQUENCE).toClass(sequence);
    }
    handler(handlerFn) {
        this.restServer.handler(handlerFn);
    }
    /**
     * Mount static assets to the REST server.
     * See https://expressjs.com/en/4x/api.html#express.static
     * @param path - The path(s) to serve the asset.
     * See examples at https://expressjs.com/en/4x/api.html#path-examples
     * To avoid performance penalty, `/` is not allowed for now.
     * @param rootDir - The root directory from which to serve static assets
     * @param options - Options for serve-static
     */
    static(path, rootDir, options) {
        this.restServer.static(path, rootDir, options);
    }
    /**
     * Bind a body parser to the server context
     * @param parserClass - Body parser class
     * @param address - Optional binding address
     */
    bodyParser(bodyParserClass, address) {
        return this.restServer.bodyParser(bodyParserClass, address);
    }
    /**
     * Configure the `basePath` for the rest server
     * @param path - Base path
     */
    basePath(path = '') {
        this.restServer.basePath(path);
    }
    route(routeOrVerb, path, spec, controllerCtorOrHandler, controllerFactory, methodName) {
        const server = this.restServer;
        if (typeof routeOrVerb === 'object') {
            return server.route(routeOrVerb);
        }
        else if (arguments.length === 4) {
            return server.route(routeOrVerb, path, spec, controllerCtorOrHandler);
        }
        else {
            return server.route(routeOrVerb, path, spec, controllerCtorOrHandler, controllerFactory, methodName);
        }
    }
    /**
     * Register a route redirecting callers to a different URL.
     *
     * @example
     * ```ts
     * app.redirect('/explorer', '/explorer/');
     * ```
     *
     * @param fromPath - URL path of the redirect endpoint
     * @param toPathOrUrl - Location (URL path or full URL) where to redirect to.
     * If your server is configured with a custom `basePath`, then the base path
     * is prepended to the target location.
     * @param statusCode - HTTP status code to respond with,
     *   defaults to 303 (See Other).
     */
    redirect(fromPath, toPathOrUrl, statusCode) {
        return this.restServer.redirect(fromPath, toPathOrUrl, statusCode);
    }
    /**
     * Set the OpenAPI specification that defines the REST API schema for this
     * application. All routes, parameter definitions and return types will be
     * defined in this way.
     *
     * Note that this will override any routes defined via decorators at the
     * controller level (this function takes precedent).
     *
     * @param spec - The OpenAPI specification, as an object.
     * @returns Binding for the api spec
     */
    api(spec) {
        return this.bind(keys_1.RestBindings.API_SPEC).to(spec);
    }
    /**
     * Mount an Express router to expose additional REST endpoints handled
     * via legacy Express-based stack.
     *
     * @param basePath - Path where to mount the router at, e.g. `/` or `/api`.
     * @param router - The Express router to handle the requests.
     * @param spec - A partial OpenAPI spec describing endpoints provided by the
     * router. LoopBack will prepend `basePath` to all endpoints automatically.
     * This argument is optional. You can leave it out if you don't want to
     * document the routes.
     */
    mountExpressRouter(basePath, router, spec) {
        this.restServer.mountExpressRouter(basePath, router, spec);
    }
}
exports.RestApplication = RestApplication;
//# sourceMappingURL=rest.application.js.map