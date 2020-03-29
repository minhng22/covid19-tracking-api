"use strict";
// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: @loopback/rest
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const context_1 = require("@loopback/context");
const body_parser_1 = require("body-parser");
const type_is_1 = require("type-is");
const keys_1 = require("../keys");
const body_parser_helpers_1 = require("./body-parser.helpers");
let UrlEncodedBodyParser = class UrlEncodedBodyParser {
    constructor(options = {}) {
        this.name = body_parser_helpers_1.builtinParsers.urlencoded;
        const urlencodedOptions = body_parser_helpers_1.getParserOptions('urlencoded', options);
        this.urlencodedParser = body_parser_1.urlencoded(urlencodedOptions);
    }
    supports(mediaType) {
        return !!type_is_1.is(mediaType, 'urlencoded');
    }
    async parse(request) {
        const body = await body_parser_helpers_1.invokeBodyParserMiddleware(this.urlencodedParser, request);
        return { value: body, coercionRequired: true };
    }
};
UrlEncodedBodyParser = tslib_1.__decorate([
    tslib_1.__param(0, context_1.inject(keys_1.RestBindings.REQUEST_BODY_PARSER_OPTIONS, { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object])
], UrlEncodedBodyParser);
exports.UrlEncodedBodyParser = UrlEncodedBodyParser;
//# sourceMappingURL=body-parser.urlencoded.js.map