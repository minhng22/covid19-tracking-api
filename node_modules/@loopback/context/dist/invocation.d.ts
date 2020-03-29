import { Context } from './context';
import { ValueOrPromise } from './value-promise';
/**
 * Return value for a method invocation
 */
export declare type InvocationResult = any;
/**
 * Array of arguments for a method invocation
 */
export declare type InvocationArgs = any[];
/**
 * An interface to represent the caller of the invocation
 */
export interface InvocationSource<T = unknown> {
    /**
     * Type of the invoker, such as `proxy` and `route`
     */
    readonly type: string;
    /**
     * Metadata for the source, such as `ResolutionSession`
     */
    readonly value: T;
}
/**
 * InvocationContext represents the context to invoke interceptors for a method.
 * The context can be used to access metadata about the invocation as well as
 * other dependencies.
 */
export declare class InvocationContext extends Context {
    readonly target: object;
    readonly methodName: string;
    readonly args: InvocationArgs;
    readonly source?: InvocationSource<unknown> | undefined;
    /**
     * Construct a new instance of `InvocationContext`
     * @param parent - Parent context, such as the RequestContext
     * @param target - Target class (for static methods) or prototype/object
     * (for instance methods)
     * @param methodName - Method name
     * @param args - An array of arguments
     */
    constructor(parent: Context, target: object, methodName: string, args: InvocationArgs, source?: InvocationSource<unknown> | undefined);
    /**
     * The target class, such as `OrderController`
     */
    get targetClass(): Function;
    /**
     * The target name, such as `OrderController.prototype.cancelOrder`
     */
    get targetName(): string;
    /**
     * Description of the invocation
     */
    get description(): string;
    toString(): string;
    /**
     * Assert the method exists on the target. An error will be thrown if otherwise.
     * @param context - Invocation context
     */
    assertMethodExists(): Record<string, Function>;
    /**
     * Invoke the target method with the given context
     * @param context - Invocation context
     * @param options - Options for the invocation
     */
    invokeTargetMethod(options?: InvocationOptions): any;
}
/**
 * Options to control invocations
 */
export declare type InvocationOptions = {
    /**
     * Skip dependency injection on method parameters
     */
    skipParameterInjection?: boolean;
    /**
     * Skip invocation of interceptors
     */
    skipInterceptors?: boolean;
    /**
     * Information about the source object that makes the invocation. For REST,
     * it's a `Route`. For injected proxies, it's a `Binding`.
     */
    source?: InvocationSource;
};
/**
 * Invoke a method using dependency injection. Interceptors are invoked as part
 * of the invocation.
 * @param target - Target of the method, it will be the class for a static
 * method, and instance or class prototype for a prototype method
 * @param method - Name of the method
 * @param ctx - Context object
 * @param nonInjectedArgs - Optional array of args for non-injected parameters
 * @param options - Options for the invocation
 */
export declare function invokeMethod(target: object, method: string, ctx: Context, nonInjectedArgs?: InvocationArgs, options?: InvocationOptions): ValueOrPromise<InvocationResult>;
