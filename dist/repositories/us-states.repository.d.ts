import { DefaultCrudRepository } from '@loopback/repository';
import { UsStates, UsStatesRelations } from '../models';
import { MongoDbDataSource } from '../datasources';
export declare class UsStatesRepository extends DefaultCrudRepository<UsStates, typeof UsStates.prototype.id, UsStatesRelations> {
    constructor(dataSource: MongoDbDataSource);
}
