"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let LocationControllerController = class LocationControllerController {
    constructor(locationRepository) {
        this.locationRepository = locationRepository;
    }
    async create(location) {
        return this.locationRepository.create(location);
    }
    async count(where) {
        return this.locationRepository.count(where);
    }
    async find(filter) {
        return this.locationRepository.find(filter);
    }
    async updateAll(location, where) {
        return this.locationRepository.updateAll(location, where);
    }
    async findById(id, filter) {
        return this.locationRepository.findById(id, filter);
    }
    async updateById(id, location) {
        await this.locationRepository.updateById(id, location);
    }
    async replaceById(id, location) {
        await this.locationRepository.replaceById(id, location);
    }
    async deleteById(id) {
        await this.locationRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/locations', {
        responses: {
            '200': {
                description: 'Location model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Location) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Location, {
                    title: 'NewLocation',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LocationControllerController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/locations/count', {
        responses: {
            '200': {
                description: 'Location model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Location)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LocationControllerController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/locations', {
        responses: {
            '200': {
                description: 'Array of Location model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.Location, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Location)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LocationControllerController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/locations', {
        responses: {
            '200': {
                description: 'Location PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Location, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Location)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Location, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LocationControllerController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/locations/{id}', {
        responses: {
            '200': {
                description: 'Location model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Location, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Location, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LocationControllerController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/locations/{id}', {
        responses: {
            '204': {
                description: 'Location PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Location, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Location]),
    tslib_1.__metadata("design:returntype", Promise)
], LocationControllerController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/locations/{id}', {
        responses: {
            '204': {
                description: 'Location PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Location]),
    tslib_1.__metadata("design:returntype", Promise)
], LocationControllerController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/locations/{id}', {
        responses: {
            '204': {
                description: 'Location DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], LocationControllerController.prototype, "deleteById", null);
LocationControllerController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.LocationRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.LocationRepository])
], LocationControllerController);
exports.LocationControllerController = LocationControllerController;
//# sourceMappingURL=location.controller.js.map