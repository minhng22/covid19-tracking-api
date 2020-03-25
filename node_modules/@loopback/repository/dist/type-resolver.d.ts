import { Class } from './common-types';
/**
 * A type resolver is a function that returns a class representing the type,
 * typically a Model or Entity (e.g. Product).
 *
 * We use type resolvers to break require() loops when defining relations.
 * The target model (class) is provided via a provider, thus deferring
 * the actual reference to the class itself until later, when both sides
 * of the relation are created as JavaScript classes.
 *
 * @typeParam Type - The type we are resolving, for example `Entity` or `Product`.
 * This parameter is required.
 *
 * @typeParam StaticMembers - The static properties available on the
 * type class. For example, all models have static `modelName` property.
 * When `StaticMembers` are not provided, we default to static properties of
 * a `Function` - `name`, `length`, `apply`, `call`, etc.
 * Please note the value returned by the resolver is described as having
 * arbitrary additional static properties (see how Class is defined).
 */
export declare type TypeResolver<Type extends Object, StaticMembers = Function> = () => Class<Type> & StaticMembers;
/**
 * A function that checks whether a function is a TypeResolver or not.
 * @param fn - The value to check.
 */
export declare function isTypeResolver<T extends object>(fn: any): fn is TypeResolver<T>;
/**
 * Check if the provided function is a built-in type provided by JavaScript
 * and/or Node.js. E.g. `Number`, `Array`, `Buffer`, etc.
 */
export declare function isBuiltinType(fn: Function): boolean;
/**
 * Resolve a type value that may have been provided via TypeResolver.
 * @param fn - A type class or a type provider.
 * @returns The resolved type.
 */
export declare function resolveType<T extends Object>(fn: TypeResolver<T> | Class<T>): Class<T>;
export declare function resolveType<T>(fn: T): T;
