"use strict";
// Uncomment these imports to begin using these cool features!
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const context_1 = require("@loopback/context");
const rest_1 = require("@loopback/rest");
const repositories_1 = require("../repositories");
let GeoLocationController = class GeoLocationController {
    constructor(locationRepository) {
        this.locationRepository = locationRepository;
    }
    getProfileInGeoLocation() {
    }
};
tslib_1.__decorate([
    rest_1.get('/geolocation/profile'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], GeoLocationController.prototype, "getProfileInGeoLocation", null);
GeoLocationController = tslib_1.__decorate([
    tslib_1.__param(0, context_1.inject('repositories.CaseNumberRepository')),
    tslib_1.__metadata("design:paramtypes", [repositories_1.LocationRepository])
], GeoLocationController);
exports.GeoLocationController = GeoLocationController;
//# sourceMappingURL=geo-location.controller.js.map