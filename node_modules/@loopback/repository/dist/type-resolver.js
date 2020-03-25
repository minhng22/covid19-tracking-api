"use strict";
// Copyright IBM Corp. 2018,2019. All Rights Reserved.
// Node module: @loopback/repository
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A function that checks whether a function is a TypeResolver or not.
 * @param fn - The value to check.
 */
function isTypeResolver(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
fn) {
    // 1. A type provider must be a function
    if (typeof fn !== 'function')
        return false;
    // 2. A class constructor is not a type provider
    if (/^class/.test(fn.toString()))
        return false;
    // 3. Built-in types like Date & Array are not type providers
    if (isBuiltinType(fn))
        return false;
    // TODO(bajtos): support model classes defined via ES5 constructor function
    return true;
}
exports.isTypeResolver = isTypeResolver;
/**
 * Check if the provided function is a built-in type provided by JavaScript
 * and/or Node.js. E.g. `Number`, `Array`, `Buffer`, etc.
 */
function isBuiltinType(fn) {
    return (
    // scalars
    fn === Number ||
        fn === Boolean ||
        fn === String ||
        // objects
        fn === Object ||
        fn === Array ||
        fn === Date ||
        fn === RegExp ||
        fn === Buffer ||
        // function as a type
        fn === Function);
}
exports.isBuiltinType = isBuiltinType;
function resolveType(fn) {
    return isTypeResolver(fn) ? fn() : fn;
}
exports.resolveType = resolveType;
//# sourceMappingURL=type-resolver.js.map