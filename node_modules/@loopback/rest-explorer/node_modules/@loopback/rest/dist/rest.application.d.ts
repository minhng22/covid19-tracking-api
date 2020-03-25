import { Binding, BindingAddress, Constructor, Context } from '@loopback/context';
import { Application, ApplicationConfig, Server } from '@loopback/core';
import { OpenApiSpec, OperationObject } from '@loopback/openapi-v3';
import { PathParams } from 'express-serve-static-core';
import { ServeStaticOptions } from 'serve-static';
import { BodyParser } from './body-parsers';
import { RestBindings } from './keys';
import { HttpRequestListener, HttpServerLike, RestServer } from './rest.server';
import { ControllerClass, ControllerFactory, ExpressRequestHandler, RouteEntry } from './router';
import { RouterSpec } from './router/router-spec';
import { SequenceFunction, SequenceHandler } from './sequence';
export declare const ERR_NO_MULTI_SERVER: string;
export declare const SequenceActions: typeof RestBindings.SequenceActions;
/**
 * An implementation of the Application class that automatically provides
 * an instance of a REST server. This application class is intended to be
 * a single-server implementation. Any attempt to bind additional servers
 * will throw an error.
 *
 */
export declare class RestApplication extends Application implements HttpServerLike {
    /**
     * The main REST server instance providing REST API for this application.
     */
    get restServer(): RestServer;
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
    get requestHandler(): HttpRequestListener;
    /**
     * Create a REST application with the given parent context
     * @param parent - Parent context
     */
    constructor(parent: Context);
    /**
     * Create a REST application with the given configuration and parent context
     * @param config - Application configuration
     * @param parent - Parent context
     */
    constructor(config?: ApplicationConfig, parent?: Context);
    server(server: Constructor<Server>, name?: string): Binding;
    sequence(sequence: Constructor<SequenceHandler>): Binding;
    handler(handlerFn: SequenceFunction): void;
    /**
     * Mount static assets to the REST server.
     * See https://expressjs.com/en/4x/api.html#express.static
     * @param path - The path(s) to serve the asset.
     * See examples at https://expressjs.com/en/4x/api.html#path-examples
     * To avoid performance penalty, `/` is not allowed for now.
     * @param rootDir - The root directory from which to serve static assets
     * @param options - Options for serve-static
     */
    static(path: PathParams, rootDir: string, options?: ServeStaticOptions): void;
    /**
     * Bind a body parser to the server context
     * @param parserClass - Body parser class
     * @param address - Optional binding address
     */
    bodyParser(bodyParserClass: Constructor<BodyParser>, address?: BindingAddress<BodyParser>): Binding<BodyParser>;
    /**
     * Configure the `basePath` for the rest server
     * @param path - Base path
     */
    basePath(path?: string): void;
    /**
     * Register a new Controller-based route.
     *
     * @example
     * ```ts
     * class MyController {
     *   greet(name: string) {
     *     return `hello ${name}`;
     *   }
     * }
     * app.route('get', '/greet', operationSpec, MyController, 'greet');
     * ```
     *
     * @param verb - HTTP verb of the endpoint
     * @param path - URL path of the endpoint
     * @param spec - The OpenAPI spec describing the endpoint (operation)
     * @param controllerCtor - Controller constructor
     * @param controllerFactory - A factory function to create controller instance
     * @param methodName - The name of the controller method
     */
    route<T>(verb: string, path: string, spec: OperationObject, controllerCtor: ControllerClass<T>, controllerFactory: ControllerFactory<T>, methodName: string): Binding;
    /**
     * Register a new route invoking a handler function.
     *
     * @example
     * ```ts
     * function greet(name: string) {
     *  return `hello ${name}`;
     * }
     * app.route('get', '/', operationSpec, greet);
     * ```
     *
     * @param verb - HTTP verb of the endpoint
     * @param path - URL path of the endpoint
     * @param spec - The OpenAPI spec describing the endpoint (operation)
     * @param handler - The function to invoke with the request parameters
     * described in the spec.
     */
    route(verb: string, path: string, spec: OperationObject, handler: Function): Binding;
    /**
     * Register a new route.
     *
     * @example
     * ```ts
     * function greet(name: string) {
     *  return `hello ${name}`;
     * }
     * const route = new Route('get', '/', operationSpec, greet);
     * app.route(route);
     * ```
     *
     * @param route - The route to add.
     */
    route(route: RouteEntry): Binding;
    /**
     * Register a new route.
     *
     * @example
     * ```ts
     * function greet(name: string) {
     *  return `hello ${name}`;
     * }
     * app.route('get', '/', operationSpec, greet);
     * ```
     */
    route(verb: string, path: string, spec: OperationObject, handler: Function): Binding;
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
    redirect(fromPath: string, toPathOrUrl: string, statusCode?: number): Binding;
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
    api(spec: OpenApiSpec): Binding;
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
    mountExpressRouter(basePath: string, router: ExpressRequestHandler, spec?: RouterSpec): void;
}
