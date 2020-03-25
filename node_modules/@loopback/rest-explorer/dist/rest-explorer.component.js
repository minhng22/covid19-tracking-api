"use strict";
// Copyright IBM Corp. 2018. All Rights Reserved.
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
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const context_1 = require("@loopback/context");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const rest_explorer_controller_1 = require("./rest-explorer.controller");
const rest_explorer_keys_1 = require("./rest-explorer.keys");
const swaggerUI = require('swagger-ui-dist');
/**
 * A component providing a self-hosted API Explorer.
 */
let RestExplorerComponent = class RestExplorerComponent {
    constructor(application, restExplorerConfig = {}) {
        var _a;
        this.application = application;
        const explorerPath = (_a = restExplorerConfig.path, (_a !== null && _a !== void 0 ? _a : '/explorer'));
        this.registerControllerRoute('get', explorerPath, 'indexRedirect');
        this.registerControllerRoute('get', explorerPath + '/', 'index');
        if (restExplorerConfig.useSelfHostedSpec !== false) {
            this.registerControllerRoute('get', explorerPath + '/openapi.json', 'spec');
        }
        application.static(explorerPath, swaggerUI.getAbsoluteFSPath());
        // Disable redirect to externally hosted API explorer
        application.restServer.config.apiExplorer = { disabled: true };
    }
    registerControllerRoute(verb, path, methodName) {
        this.application.route(verb, path, {
            'x-visibility': 'undocumented',
            responses: {},
        }, rest_explorer_controller_1.ExplorerController, rest_1.createControllerFactoryForClass(rest_explorer_controller_1.ExplorerController), methodName);
    }
};
RestExplorerComponent = __decorate([
    context_1.bind({ tags: { [context_1.ContextTags.KEY]: rest_explorer_keys_1.RestExplorerBindings.COMPONENT.key } }),
    __param(0, context_1.inject(core_1.CoreBindings.APPLICATION_INSTANCE)),
    __param(1, context_1.config()),
    __metadata("design:paramtypes", [rest_1.RestApplication, Object])
], RestExplorerComponent);
exports.RestExplorerComponent = RestExplorerComponent;
//# sourceMappingURL=rest-explorer.component.js.map