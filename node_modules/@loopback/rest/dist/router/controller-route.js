"use strict";
// Copyright IBM Corp. 2018,2020. All Rights Reserved.
// Node module: @loopback/rest
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const context_1 = require("@loopback/context");
const core_1 = require("@loopback/core");
const assert_1 = tslib_1.__importDefault(require("assert"));
const debug_1 = tslib_1.__importDefault(require("debug"));
const http_errors_1 = tslib_1.__importDefault(require("http-errors"));
const util_1 = require("util");
const keys_1 = require("../keys");
const base_route_1 = require("./base-route");
const debug = debug_1.default('loopback:rest:controller-route');
/**
 * A route backed by a controller
 */
class ControllerRoute extends base_route_1.BaseRoute {
    /**
     * Construct a controller based route
     * @param verb - http verb
     * @param path - http request path
     * @param spec - OpenAPI operation spec
     * @param controllerCtor - Controller class
     * @param controllerFactory - A factory function to create a controller instance
     * @param methodName - Controller method name, default to `x-operation-name`
     */
    constructor(verb, path, spec, controllerCtor, controllerFactory, methodName) {
        const controllerName = spec['x-controller-name'] || controllerCtor.name;
        methodName = methodName !== null && methodName !== void 0 ? methodName : spec['x-operation-name'];
        if (!methodName) {
            throw new Error('methodName must be provided either via the ControllerRoute argument ' +
                'or via "x-operation-name" extension field in OpenAPI spec. ' +
                `Operation: "${verb} ${path}" ` +
                `Controller: ${controllerName}.`);
        }
        super(verb, path, 
        // Add x-controller-name and x-operation-name if not present
        Object.assign({
            'x-controller-name': controllerName,
            'x-operation-name': methodName,
            tags: [controllerName],
        }, spec));
        this._controllerFactory = controllerFactory !== null && controllerFactory !== void 0 ? controllerFactory : createControllerFactoryForClass(controllerCtor);
        this._controllerCtor = controllerCtor;
        this._controllerName = controllerName || controllerCtor.name;
        this._methodName = methodName;
    }
    describe() {
        return `${this._controllerName}.${this._methodName}`;
    }
    updateBindings(requestContext) {
        /*
         * Bind current controller to the request context in `SINGLETON` scope.
         * Within the same request, we always get the same instance of the
         * current controller when `requestContext.get(CoreBindings.CONTROLLER_CURRENT)`
         * is invoked.
         *
         * Please note the controller class itself can be bound to other scopes,
         * such as SINGLETON or TRANSIENT (default) in the application or server
         * context.
         *
         * - SINGLETON: all requests share the same instance of a given controller
         * - TRANSIENT: each request has its own instance of a given controller
         */
        requestContext
            .bind(core_1.CoreBindings.CONTROLLER_CURRENT)
            .toDynamicValue(() => this._controllerFactory(requestContext))
            .inScope(context_1.BindingScope.SINGLETON);
        requestContext.bind(core_1.CoreBindings.CONTROLLER_CLASS).to(this._controllerCtor);
        requestContext
            .bind(core_1.CoreBindings.CONTROLLER_METHOD_NAME)
            .to(this._methodName);
        requestContext.bind(keys_1.RestBindings.OPERATION_SPEC_CURRENT).to(this.spec);
    }
    async invokeHandler(requestContext, args) {
        const controller = await requestContext.get('controller.current');
        if (typeof controller[this._methodName] !== 'function') {
            throw new http_errors_1.default.NotFound(`Controller method not found: ${this.describe()}`);
        }
        // Invoke the method with dependency injection
        return context_1.invokeMethod(controller, this._methodName, requestContext, args, {
            source: new base_route_1.RouteSource(this),
        });
    }
}
exports.ControllerRoute = ControllerRoute;
/**
 * Create a controller factory function for a given binding key
 * @param key - Binding key
 */
function createControllerFactoryForBinding(key) {
    return ctx => ctx.get(key);
}
exports.createControllerFactoryForBinding = createControllerFactoryForBinding;
/**
 * Create a controller factory function for a given class
 * @param controllerCtor - Controller class
 */
function createControllerFactoryForClass(controllerCtor) {
    return async (ctx) => {
        // By default, we get an instance of the controller from the context
        // using `controllers.<controllerName>` as the key
        let inst = await ctx.get(`controllers.${controllerCtor.name}`, {
            optional: true,
        });
        if (inst === undefined) {
            inst = await context_1.instantiateClass(controllerCtor, ctx);
        }
        return inst;
    };
}
exports.createControllerFactoryForClass = createControllerFactoryForClass;
/**
 * Create a controller factory function for a given instance
 * @param controllerCtor - Controller instance
 */
function createControllerFactoryForInstance(controllerInst) {
    return ctx => controllerInst;
}
exports.createControllerFactoryForInstance = createControllerFactoryForInstance;
/**
 * Create routes for a controller with the given spec
 * @param spec - Controller spec
 * @param controllerCtor - Controller class
 * @param controllerFactory - Controller factory
 */
function createRoutesForController(spec, controllerCtor, controllerFactory) {
    var _a;
    const routes = [];
    assert_1.default(typeof spec === 'object' && !!spec, 'API specification must be a non-null object');
    if (!spec.paths || !Object.keys(spec.paths).length) {
        return routes;
    }
    debug('Creating route for controller with API %s', util_1.inspect(spec, { depth: null }));
    const basePath = (_a = spec.basePath) !== null && _a !== void 0 ? _a : '/';
    for (const p in spec.paths) {
        for (const verb in spec.paths[p]) {
            const opSpec = spec.paths[p][verb];
            const fullPath = joinPath(basePath, p);
            const route = new ControllerRoute(verb, fullPath, opSpec, controllerCtor, controllerFactory);
            routes.push(route);
        }
    }
    return routes;
}
exports.createRoutesForController = createRoutesForController;
function joinPath(basePath, path) {
    const fullPath = [basePath, path]
        .join('/') // Join by /
        .replace(/(\/){2,}/g, '/') // Remove extra /
        .replace(/\/$/, '') // Remove trailing /
        .replace(/^(\/)?/, '/'); // Add leading /
    return fullPath;
}
exports.joinPath = joinPath;
//# sourceMappingURL=controller-route.js.map