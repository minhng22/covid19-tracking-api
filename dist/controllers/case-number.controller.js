"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let CaseNumberController = class CaseNumberController {
    constructor(caseNumberRepository) {
        this.caseNumberRepository = caseNumberRepository;
    }
    async create(caseNumber) {
        return this.caseNumberRepository.create(caseNumber);
    }
    async count(where) {
        return this.caseNumberRepository.count(where);
    }
    async find(filter) {
        return this.caseNumberRepository.find(filter);
    }
    async updateAll(caseNumber, where) {
        return this.caseNumberRepository.updateAll(caseNumber, where);
    }
    async findById(id, filter) {
        return this.caseNumberRepository.findById(id, filter);
    }
    async updateById(id, caseNumber) {
        await this.caseNumberRepository.updateById(id, caseNumber);
    }
    async replaceById(id, caseNumber) {
        await this.caseNumberRepository.replaceById(id, caseNumber);
    }
    async deleteById(id) {
        await this.caseNumberRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/case-numbers', {
        responses: {
            '200': {
                description: 'CaseNumber model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.CaseNumber) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.CaseNumber, {
                    title: 'NewCaseNumber',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CaseNumberController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/case-numbers/count', {
        responses: {
            '200': {
                description: 'CaseNumber model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.CaseNumber)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CaseNumberController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/case-numbers', {
        responses: {
            '200': {
                description: 'Array of CaseNumber model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.CaseNumber, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.CaseNumber)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CaseNumberController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/case-numbers', {
        responses: {
            '200': {
                description: 'CaseNumber PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.CaseNumber, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.CaseNumber)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.CaseNumber, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CaseNumberController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/case-numbers/{id}', {
        responses: {
            '200': {
                description: 'CaseNumber model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.CaseNumber, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.CaseNumber, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CaseNumberController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/case-numbers/{id}', {
        responses: {
            '204': {
                description: 'CaseNumber PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.CaseNumber, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.CaseNumber]),
    tslib_1.__metadata("design:returntype", Promise)
], CaseNumberController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/case-numbers/{id}', {
        responses: {
            '204': {
                description: 'CaseNumber PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.CaseNumber]),
    tslib_1.__metadata("design:returntype", Promise)
], CaseNumberController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/case-numbers/{id}', {
        responses: {
            '204': {
                description: 'CaseNumber DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], CaseNumberController.prototype, "deleteById", null);
CaseNumberController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.CaseNumberRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.CaseNumberRepository])
], CaseNumberController);
exports.CaseNumberController = CaseNumberController;
//# sourceMappingURL=case-number.controller.js.map