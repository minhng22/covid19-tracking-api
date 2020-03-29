"use strict";
// Copyright IBM Corp. 2018,2019. All Rights Reserved.
// Node module: @loopback/rest
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = debug_1.default('loopback:rest:body-parser');
/**
 * Get the content-type header value from the request
 * @param req - Http request
 */
function getContentType(req) {
    return req.get('content-type');
}
exports.getContentType = getContentType;
/**
 * Normalize parsing errors as `4xx`
 * @param err
 */
function normalizeParsingError(err) {
    debug('Cannot parse request body %j', err);
    if (!err.statusCode || err.statusCode >= 500) {
        err.statusCode = 400;
    }
    return err;
}
exports.normalizeParsingError = normalizeParsingError;
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Parse the request body asynchronously
 * @param handle - The express middleware handler
 * @param request - Http request
 */
function invokeBodyParserMiddleware(handle, request) {
    // A hack to fool TypeScript as we don't need `response`
    const response = {};
    return new Promise((resolve, reject) => {
        handle(request, response, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve(request.body);
        });
    });
}
exports.invokeBodyParserMiddleware = invokeBodyParserMiddleware;
// Default limit of the body length
exports.DEFAULT_LIMIT = '1mb';
function getParserOptions(type, options) {
    const opts = { limit: exports.DEFAULT_LIMIT };
    switch (type) {
        case 'json':
            // Allow */json and */*+json
            opts.type = ['*/json', '*/*+json'];
            opts.strict = false;
            break;
        case 'urlencoded':
            opts.type = type;
            opts.extended = true;
            break;
        case 'text':
            // Set media type to `text/*` to match `text/plain` or `text/html`
            opts.type = 'text/*';
            break;
        case 'raw':
            opts.type = ['application/octet-stream', '*/*'];
            break;
    }
    Object.assign(opts, options[type], options);
    for (const k of ['json', 'urlencoded', 'text', 'raw']) {
        delete opts[k];
    }
    return opts;
}
exports.getParserOptions = getParserOptions;
var builtinParsers;
(function (builtinParsers) {
    builtinParsers.json = Symbol('json');
    builtinParsers.urlencoded = Symbol('urlencoded');
    builtinParsers.text = Symbol('text');
    builtinParsers.raw = Symbol('raw');
    builtinParsers.stream = Symbol('stream');
    builtinParsers.names = [
        builtinParsers.json,
        builtinParsers.urlencoded,
        builtinParsers.text,
        builtinParsers.raw,
        builtinParsers.stream,
    ];
    builtinParsers.mapping = {
        json: builtinParsers.json,
        urlencoded: builtinParsers.urlencoded,
        text: builtinParsers.text,
        raw: builtinParsers.raw,
        stream: builtinParsers.stream,
    };
})(builtinParsers = exports.builtinParsers || (exports.builtinParsers = {}));
//# sourceMappingURL=body-parser.helpers.js.map