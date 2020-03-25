"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let CountyController = class CountyController {
    constructor(countyRepository) {
        this.countyRepository = countyRepository;
    }
    async create(county) {
        return this.countyRepository.create(county);
    }
    async count(where) {
        return this.countyRepository.count(where);
    }
    async find(filter) {
        return this.countyRepository.find(filter);
    }
    async updateAll(county, where) {
        return this.countyRepository.updateAll(county, where);
    }
    async findById(id, filter) {
        return this.countyRepository.findById(id, filter);
    }
    async updateById(id, county) {
        await this.countyRepository.updateById(id, county);
    }
    async replaceById(id, county) {
        await this.countyRepository.replaceById(id, county);
    }
    async deleteById(id) {
        await this.countyRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/counties', {
        responses: {
            '200': {
                description: 'County model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.County) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.County, {
                    title: 'NewCounty',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CountyController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/counties/count', {
        responses: {
            '200': {
                description: 'County model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.County)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CountyController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/counties', {
        responses: {
            '200': {
                description: 'Array of County model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.County, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.County)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CountyController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/counties', {
        responses: {
            '200': {
                description: 'County PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.County, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.County)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.County, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CountyController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/counties/{id}', {
        responses: {
            '200': {
                description: 'County model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.County, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.County, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CountyController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/counties/{id}', {
        responses: {
            '204': {
                description: 'County PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.County, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.County]),
    tslib_1.__metadata("design:returntype", Promise)
], CountyController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/counties/{id}', {
        responses: {
            '204': {
                description: 'County PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.County]),
    tslib_1.__metadata("design:returntype", Promise)
], CountyController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/counties/{id}', {
        responses: {
            '204': {
                description: 'County DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], CountyController.prototype, "deleteById", null);
CountyController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.CountyRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.CountyRepository])
], CountyController);
exports.CountyController = CountyController;
//# sourceMappingURL=county.controller.js.map