"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let UsStateControllerController = class UsStateControllerController {
    constructor(usStatesRepository) {
        this.usStatesRepository = usStatesRepository;
    }
    async count(where) {
        return this.usStatesRepository.count(where);
    }
    async find(filter) {
        return this.usStatesRepository.find(filter);
    }
    async updateAll(usStates, where) {
        return this.usStatesRepository.updateAll(usStates, where);
    }
    async findById(id, filter) {
        return this.usStatesRepository.findById(id, filter);
    }
};
tslib_1.__decorate([
    rest_1.get('/us-states/count', {
        responses: {
            '200': {
                description: 'UsStates model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.UsStates)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsStateControllerController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/us-states', {
        responses: {
            '200': {
                description: 'Array of UsStates model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.UsStates, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.UsStates)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsStateControllerController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/us-states', {
        responses: {
            '200': {
                description: 'UsStates PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.UsStates, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.UsStates)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.UsStates, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsStateControllerController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/us-states/{id}', {
        responses: {
            '200': {
                description: 'USStates model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.UsStates, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.UsStates, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsStateControllerController.prototype, "findById", null);
UsStateControllerController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.UsStatesRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UsStatesRepository])
], UsStateControllerController);
exports.UsStateControllerController = UsStateControllerController;
//# sourceMappingURL=us-state-controller.controller.js.map