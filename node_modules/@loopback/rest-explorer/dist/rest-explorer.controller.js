"use strict";
// Copyright IBM Corp. 2018,2019. All Rights Reserved.
// Node module: @loopback/rest-explorer
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("@loopback/context");
const rest_1 = require("@loopback/rest");
const ejs_1 = __importDefault(require("ejs"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const rest_explorer_keys_1 = require("./rest-explorer.keys");
// TODO(bajtos) Allow users to customize the template
const indexHtml = path_1.default.resolve(__dirname, '../templates/index.html.ejs');
const template = fs_1.default.readFileSync(indexHtml, 'utf-8');
const templateFn = ejs_1.default.compile(template);
let ExplorerController = class ExplorerController {
    constructor(restConfig = {}, explorerConfig = {}, serverBasePath, restServer, requestContext) {
        this.serverBasePath = serverBasePath;
        this.restServer = restServer;
        this.requestContext = requestContext;
        this.useSelfHostedSpec = explorerConfig.useSelfHostedSpec !== false;
        this.openApiSpecUrl = this.getOpenApiSpecUrl(restConfig);
    }
    indexRedirect() {
        const { request, response } = this.requestContext;
        let url = request.originalUrl || request.url;
        // be safe against path-modifying reverse proxies by generating the redirect
        // as a _relative_ URL
        const lastSlash = url.lastIndexOf('/');
        if (lastSlash >= 0) {
            url = './' + url.substr(lastSlash + 1) + '/';
        }
        response.redirect(301, url);
    }
    index() {
        let openApiSpecUrl = this.openApiSpecUrl;
        // if using self-hosted openapi spec, then the path to use is always the
        // exact relative path, and no base path logic needs to be applied
        if (!this.useSelfHostedSpec) {
            // baseURL is composed from mountPath and basePath
            // OpenAPI endpoints ignore basePath but do honor mountPath
            let rootPath = this.requestContext.request.baseUrl;
            if (this.serverBasePath &&
                this.serverBasePath !== '/' &&
                rootPath.endsWith(this.serverBasePath)) {
                rootPath = rootPath.slice(0, -this.serverBasePath.length);
            }
            if (rootPath && rootPath !== '/') {
                openApiSpecUrl = rootPath + openApiSpecUrl;
            }
        }
        const data = {
            openApiSpecUrl,
        };
        const homePage = templateFn(data);
        this.requestContext.response
            .status(200)
            .contentType('text/html')
            .send(homePage);
    }
    spec() {
        return this.restServer.getApiSpec(this.requestContext);
    }
    getOpenApiSpecUrl(restConfig) {
        var _a, _b;
        if (this.useSelfHostedSpec) {
            return './' + ExplorerController.OPENAPI_RELATIVE_URL;
        }
        const openApiConfig = (_a = restConfig.openApiSpec, (_a !== null && _a !== void 0 ? _a : {}));
        const endpointMapping = (_b = openApiConfig.endpointMapping, (_b !== null && _b !== void 0 ? _b : {}));
        const endpoint = Object.keys(endpointMapping).find(k => isOpenApiV3Json(endpointMapping[k]));
        return (endpoint !== null && endpoint !== void 0 ? endpoint : '/openapi.json');
    }
};
ExplorerController.OPENAPI_RELATIVE_URL = 'openapi.json';
ExplorerController.OPENAPI_FORM = Object.freeze({
    version: '3.0.0',
    format: 'json',
});
ExplorerController = __decorate([
    __param(0, context_1.inject(rest_1.RestBindings.CONFIG, { optional: true })),
    __param(1, context_1.inject(rest_explorer_keys_1.RestExplorerBindings.CONFIG, { optional: true })),
    __param(2, context_1.inject(rest_1.RestBindings.BASE_PATH)),
    __param(3, context_1.inject(rest_1.RestBindings.SERVER)),
    __param(4, context_1.inject(rest_1.RestBindings.Http.CONTEXT)),
    __metadata("design:paramtypes", [Object, Object, String, rest_1.RestServer,
        rest_1.RequestContext])
], ExplorerController);
exports.ExplorerController = ExplorerController;
function isOpenApiV3Json(mapping) {
    return (mapping.version === ExplorerController.OPENAPI_FORM.version &&
        mapping.format === ExplorerController.OPENAPI_FORM.format);
}
//# sourceMappingURL=rest-explorer.controller.js.map