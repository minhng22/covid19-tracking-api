import { Constructor, Context, ValueOrPromise } from '@loopback/context';
import { ControllerSpec, OperationObject } from '@loopback/openapi-v3';
import { OperationArgs, OperationRetval } from '../types';
import { BaseRoute } from './base-route';
export declare type ControllerInstance = {
    [name: string]: any;
} & object;
/**
 * A factory function to create controller instances synchronously or
 * asynchronously
 */
export declare type ControllerFactory<T extends ControllerInstance> = (ctx: Context) => ValueOrPromise<T>;
/**
 * Controller class
 */
export declare type ControllerClass<T extends ControllerInstance> = Constructor<T>;
/**
 * A route backed by a controller
 */
export declare class ControllerRoute<T> extends BaseRoute {
    protected readonly _controllerCtor: ControllerClass<T>;
    protected readonly _controllerName: string;
    protected readonly _methodName: string;
    protected readonly _controllerFactory: ControllerFactory<T>;
    /**
     * Construct a controller based route
     * @param verb - http verb
     * @param path - http request path
     * @param spec - OpenAPI operation spec
     * @param controllerCtor - Controller class
     * @param controllerFactory - A factory function to create a controller instance
     * @param methodName - Controller method name, default to `x-operation-name`
     */
    constructor(verb: string, path: string, spec: OperationObject, controllerCtor: ControllerClass<T>, controllerFactory?: ControllerFactory<T>, methodName?: string);
    describe(): string;
    updateBindings(requestContext: Context): void;
    invokeHandler(requestContext: Context, args: OperationArgs): Promise<OperationRetval>;
}
/**
 * Create a controller factory function for a given binding key
 * @param key - Binding key
 */
export declare function createControllerFactoryForBinding<T>(key: string): ControllerFactory<T>;
/**
 * Create a controller factory function for a given class
 * @param controllerCtor - Controller class
 */
export declare function createControllerFactoryForClass<T>(controllerCtor: ControllerClass<T>): ControllerFactory<T>;
/**
 * Create a controller factory function for a given instance
 * @param controllerCtor - Controller instance
 */
export declare function createControllerFactoryForInstance<T>(controllerInst: T): ControllerFactory<T>;
/**
 * Create routes for a controller with the given spec
 * @param spec - Controller spec
 * @param controllerCtor - Controller class
 * @param controllerFactory - Controller factory
 */
export declare function createRoutesForController<T>(spec: ControllerSpec, controllerCtor: ControllerClass<T>, controllerFactory?: ControllerFactory<T>): ControllerRoute<T>[];
export declare function joinPath(basePath: string, path: string): string;
