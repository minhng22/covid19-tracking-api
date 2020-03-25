"use strict";
// Copyright IBM Corp. 2018,2019. All Rights Reserved.
// Node module: @loopback/rest
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const path_to_regexp_1 = require("path-to-regexp");
/**
 * OpenAPI spec 3.x does not specify the valid forms of path templates.
 *
 * Other ones such as [URI Template](https://tools.ietf.org/html/rfc6570#section-2.3)
 * or [path-to-regexp](https://github.com/pillarjs/path-to-regexp#named-parameters)
 * allows `[A-Za-z0-9_]`
 */
const POSSIBLE_VARNAME_PATTERN = /\{([^\}]+)\}/g;
const VALID_VARNAME_PATTERN = /^[A-Za-z0-9_]+$/;
/**
 * Validate the path to be compatible with OpenAPI path template. No parameter
 * modifier, custom pattern, or unnamed parameter is allowed.
 */
function validateApiPath(path = '/') {
    const tokens = path_to_regexp_1.parse(path);
    for (const token of tokens) {
        if (typeof token === 'string')
            continue;
        if (typeof token === 'object') {
            const name = token.name;
            if (typeof name === 'string' && name !== '') {
                throw new Error(`Invalid path template: '${path}'. Please use {${name}} instead of ':${name}'`);
            }
            if (typeof name === 'number') {
                throw new Error(`Unnamed parameter is not allowed in path '${path}'`);
            }
            const valid = token.prefix.match(VALID_VARNAME_PATTERN);
            if (!valid) {
                throw new Error(`Invalid parameter name '${token.prefix}' found in path '${path}'`);
            }
            if (['?', '+', '*'].includes(token.modifier)) {
                throw new Error(`Parameter modifier '{${token.prefix}}${token.modifier}' is not allowed in path '${path}`);
            }
        }
    }
    return path;
}
exports.validateApiPath = validateApiPath;
/**
 * Get all path variables. For example, `/root/{foo}/bar` => `['foo']`
 */
function getPathVariables(path) {
    return path.match(POSSIBLE_VARNAME_PATTERN);
}
exports.getPathVariables = getPathVariables;
/**
 * Convert an OpenAPI path to Express (path-to-regexp) style
 * @param path - OpenAPI path with optional variables as `{var}`
 */
function toExpressPath(path) {
    // Convert `.` to `\\.` so that path-to-regexp will treat it as the plain
    // `.` character
    return path.replace(POSSIBLE_VARNAME_PATTERN, '{:$1}').replace('.', '\\.');
}
exports.toExpressPath = toExpressPath;
//# sourceMappingURL=openapi-path.js.map