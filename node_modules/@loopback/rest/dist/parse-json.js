"use strict";
// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/rest
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
// These utilities are introduced to mitigate the prototype pollution issue
// with `JSON.parse`.
// See https://hueniverse.com/a-tale-of-prototype-poisoning-2610fa170061
//
// The [bourne](https://github.com/hapijs/bourne) module provides a drop-in
// replacement for `JSON.parse` but we need to instruct `body-parser` to honor
// a `reviver` function.
/**
 * Factory to create a reviver function for `JSON.parse` to sanitize keys
 * @param reviver - Reviver function
 */
function sanitizeJsonParse(reviver) {
    return (key, value) => {
        if (key === '__proto__')
            throw new Error('JSON string cannot contain "__proto__" key.');
        if (reviver) {
            return reviver(key, value);
        }
        else {
            return value;
        }
    };
}
exports.sanitizeJsonParse = sanitizeJsonParse;
/**
 *
 * @param text - JSON string
 * @param reviver - Optional reviver function for `JSON.parse`
 */
function parseJson(text, reviver) {
    return JSON.parse(text, sanitizeJsonParse(reviver));
}
exports.parseJson = parseJson;
//# sourceMappingURL=parse-json.js.map