"use strict";
// Copyright IBM Corp. 2018,2019. All Rights Reserved.
// Node module: @loopback/repository
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
/**
 * Repository implementation
 *
 * @example
 *
 * User can import `CrudRepositoryImpl` and call its functions like:
 * `CrudRepositoryImpl.find(somefilters, someoptions)`
 *
 * Or extend class `CrudRepositoryImpl` and override its functions:
 * ```ts
 * export class TestRepository extends CrudRepositoryImpl<Test> {
 *   constructor(dataSource: DataSource, model: Test) {
 *     super(dataSource, Customer);
 *   }
 *
 *   // Override `deleteAll` to disable the operation
 *   deleteAll(where?: Where, options?: Options) {
 *     return Promise.reject(new Error('deleteAll is disabled'));
 *   }
 * }
 * ```
 */
class CrudRepositoryImpl {
    constructor(dataSource, 
    // model should have type "typeof T", but that's not supported by TSC
    entityClass) {
        this.dataSource = dataSource;
        this.entityClass = entityClass;
        this.inclusionResolvers = new Map();
        this.connector = dataSource.connector;
    }
    toModels(data) {
        return data.then(items => items.map(i => new this.entityClass(i)));
    }
    toModel(data) {
        return data.then(d => new this.entityClass(d));
    }
    create(entity, options) {
        return this.toModel(this.connector.create(this.entityClass, entity, options));
    }
    createAll(entities, options) {
        return this.toModels(this.connector.createAll(this.entityClass, entities, options));
    }
    async save(entity, options) {
        if (typeof this.connector.save === 'function') {
            return this.toModel(this.connector.save(this.entityClass, entity, options));
        }
        else {
            const id = this.entityClass.getIdOf(entity);
            if (id != null) {
                await this.replaceById(id, entity, options);
                return this.toModel(Promise.resolve(entity));
            }
            else {
                return this.create(entity, options);
            }
        }
    }
    find(filter, options) {
        return this.toModels(this.connector.find(this.entityClass, filter, options));
    }
    async findById(id, filter, options) {
        if (typeof this.connector.findById === 'function') {
            return this.toModel(this.connector.findById(this.entityClass, id, options));
        }
        const where = this.entityClass.buildWhereForId(id);
        const entities = await this.toModels(this.connector.find(this.entityClass, { where: where }, options));
        if (!entities.length) {
            throw new errors_1.EntityNotFoundError(this.entityClass, id);
        }
        return entities[0];
    }
    update(entity, options) {
        return this.updateById(this.entityClass.getIdOf(entity), entity, options);
    }
    delete(entity, options) {
        return this.deleteById(this.entityClass.getIdOf(entity), options);
    }
    updateAll(data, where, options) {
        return this.connector.updateAll(this.entityClass, data, where, options);
    }
    async updateById(id, data, options) {
        let success;
        if (typeof this.connector.updateById === 'function') {
            success = await this.connector.updateById(this.entityClass, id, data, options);
        }
        else {
            const where = this.entityClass.buildWhereForId(id);
            const result = await this.updateAll(data, where, options);
            success = result.count > 0;
        }
        if (!success) {
            throw new errors_1.EntityNotFoundError(this.entityClass, id);
        }
    }
    async replaceById(id, data, options) {
        let success;
        if (typeof this.connector.replaceById === 'function') {
            success = await this.connector.replaceById(this.entityClass, id, data, options);
        }
        else {
            // FIXME: populate inst with all properties
            const inst = data;
            const where = this.entityClass.buildWhereForId(id);
            const result = await this.updateAll(data, where, options);
            success = result.count > 0;
        }
        if (!success) {
            throw new errors_1.EntityNotFoundError(this.entityClass, id);
        }
    }
    deleteAll(where, options) {
        return this.connector.deleteAll(this.entityClass, where, options);
    }
    async deleteById(id, options) {
        let success;
        if (typeof this.connector.deleteById === 'function') {
            success = await this.connector.deleteById(this.entityClass, id, options);
        }
        else {
            const where = this.entityClass.buildWhereForId(id);
            const result = await this.deleteAll(where, options);
            success = result.count > 0;
        }
        if (!success) {
            throw new errors_1.EntityNotFoundError(this.entityClass, id);
        }
    }
    count(where, options) {
        return this.connector.count(this.entityClass, where, options);
    }
    exists(id, options) {
        if (typeof this.connector.exists === 'function') {
            return this.connector.exists(this.entityClass, id, options);
        }
        else {
            const where = this.entityClass.buildWhereForId(id);
            return this.count(where, options).then(result => result.count > 0);
        }
    }
    execute(command, parameters, options) {
        if (typeof this.connector.execute !== 'function') {
            throw new Error('Not implemented');
        }
        return this.connector.execute(command, parameters, options);
    }
}
exports.CrudRepositoryImpl = CrudRepositoryImpl;
//# sourceMappingURL=repository.js.map