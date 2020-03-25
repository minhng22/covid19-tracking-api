import { DefaultCrudRepository } from '@loopback/repository';
import { CaseNumber, CaseNumberRelations } from '../models';
import { MongoDbDataSource } from '../datasources';
export declare class CaseNumberRepository extends DefaultCrudRepository<CaseNumber, typeof CaseNumber.prototype.id, CaseNumberRelations> {
    constructor(dataSource: MongoDbDataSource);
}
