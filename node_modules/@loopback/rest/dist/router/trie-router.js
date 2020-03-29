"use strict";
// Copyright IBM Corp. 2018,2019. All Rights Reserved.
// Node module: @loopback/rest
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const context_1 = require("@loopback/context");
const util_1 = require("util");
const keys_1 = require("../keys");
const route_entry_1 = require("./route-entry");
const router_base_1 = require("./router-base");
const trie_1 = require("./trie");
const debug = require('debug')('loopback:rest:router:trie');
/**
 * Router implementation based on trie
 */
let TrieRouter = class TrieRouter extends router_base_1.BaseRouter {
    constructor(options) {
        super(options);
        this.trie = new trie_1.Trie();
    }
    addRouteWithPathVars(route) {
        // Add the route to the trie
        const key = this.getKeyForRoute(route);
        this.trie.create(key, route);
    }
    findRouteWithPathVars(verb, path) {
        var _a;
        const key = this.getKey(verb, path);
        const found = this.trie.match(key);
        debug('Route matched: %j', found);
        if (found) {
            const route = found.node.value;
            if (route) {
                debug('Route found: %s', util_1.inspect(route, { depth: 5 }));
                return route_entry_1.createResolvedRoute(route, (_a = found.params) !== null && _a !== void 0 ? _a : {});
            }
        }
        return undefined;
    }
    listRoutesWithPathVars() {
        return this.trie.list().map(n => n.value);
    }
};
TrieRouter = tslib_1.__decorate([
    tslib_1.__param(0, context_1.inject(keys_1.RestBindings.ROUTER_OPTIONS, { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object])
], TrieRouter);
exports.TrieRouter = TrieRouter;
//# sourceMappingURL=trie-router.js.map