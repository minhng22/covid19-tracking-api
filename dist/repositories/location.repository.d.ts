import { DefaultCrudRepository } from '@loopback/repository';
import { Location, LocationRelations } from '../models';
import { MongoDbDataSource } from '../datasources';
export declare class LocationRepository extends DefaultCrudRepository<Location, typeof Location.prototype.id, LocationRelations> {
    constructor(dataSource: MongoDbDataSource);
}
