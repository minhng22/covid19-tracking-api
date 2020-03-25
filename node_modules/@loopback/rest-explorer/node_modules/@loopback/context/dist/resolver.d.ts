import { Context } from './context';
import { ResolutionSession } from './resolution-session';
import { BoundValue, Constructor, MapObject, ValueOrPromise } from './value-promise';
/**
 * Create an instance of a class which constructor has arguments
 * decorated with `@inject`.
 *
 * The function returns a class when all dependencies were
 * resolved synchronously, or a Promise otherwise.
 *
 * @param ctor - The class constructor to call.
 * @param ctx - The context containing values for `@inject` resolution
 * @param session - Optional session for binding and dependency resolution
 * @param nonInjectedArgs - Optional array of args for non-injected parameters
 */
export declare function instantiateClass<T>(ctor: Constructor<T>, ctx: Context, session?: ResolutionSession, nonInjectedArgs?: any[]): ValueOrPromise<T>;
/**
 * Given a function with arguments decorated with `@inject`,
 * return the list of arguments resolved using the values
 * bound in `ctx`.

 * The function returns an argument array when all dependencies were
 * resolved synchronously, or a Promise otherwise.
 *
 * @param target - The class for constructor injection or prototype for method
 * injection
 * @param method - The method name. If set to '', the constructor will
 * be used.
 * @param ctx - The context containing values for `@inject` resolution
 * @param session - Optional session for binding and dependency resolution
 * @param nonInjectedArgs - Optional array of args for non-injected parameters
 */
export declare function resolveInjectedArguments(target: object, method: string, ctx: Context, session?: ResolutionSession, nonInjectedArgs?: any[]): ValueOrPromise<BoundValue[]>;
/**
 * Given a class with properties decorated with `@inject`,
 * return the map of properties resolved using the values
 * bound in `ctx`.

 * The function returns an argument array when all dependencies were
 * resolved synchronously, or a Promise otherwise.
 *
 * @param constructor - The class for which properties should be resolved.
 * @param ctx - The context containing values for `@inject` resolution
 * @param session - Optional session for binding and dependency resolution
 */
export declare function resolveInjectedProperties(constructor: Function, ctx: Context, session?: ResolutionSession): ValueOrPromise<MapObject<BoundValue>>;
