import { DefaultCrudRepository } from '@loopback/repository';
import { County, CountyRelations } from '../models';
import { MongoDbDataSource } from '../datasources';
export declare class CountyRepository extends DefaultCrudRepository<County, typeof County.prototype.id, CountyRelations> {
    constructor(dataSource: MongoDbDataSource);
}
