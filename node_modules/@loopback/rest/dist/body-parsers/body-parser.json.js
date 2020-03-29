"use strict";
// Copyright IBM Corp. 2018,2019. All Rights Reserved.
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
const parse_json_1 = require("../parse-json");
let JsonBodyParser = class JsonBodyParser {
    constructor(options = {}) {
        this.name = body_parser_helpers_1.builtinParsers.json;
        const jsonOptions = body_parser_helpers_1.getParserOptions('json', options);
        jsonOptions.reviver = parse_json_1.sanitizeJsonParse(jsonOptions.reviver);
        this.jsonParser = body_parser_1.json(jsonOptions);
    }
    supports(mediaType) {
        return !!type_is_1.is(mediaType, '*/json', '*/*+json');
    }
    async parse(request) {
        let body = await body_parser_helpers_1.invokeBodyParserMiddleware(this.jsonParser, request);
        // https://github.com/expressjs/body-parser/blob/master/lib/types/json.js#L71-L76
        const contentLength = request.get('content-length');
        if (contentLength != null && +contentLength === 0) {
            body = undefined;
        }
        return { value: body };
    }
};
JsonBodyParser = tslib_1.__decorate([
    tslib_1.__param(0, context_1.inject(keys_1.RestBindings.REQUEST_BODY_PARSER_OPTIONS, { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object])
], JsonBodyParser);
exports.JsonBodyParser = JsonBodyParser;
//# sourceMappingURL=body-parser.json.js.map