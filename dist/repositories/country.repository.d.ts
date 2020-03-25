import { DefaultCrudRepository } from '@loopback/repository';
import { Country, CountryRelations } from '../models';
import { MongoDbDataSource } from '../datasources';
export declare class CountryRepository extends DefaultCrudRepository<Country, typeof Country.prototype.id, CountryRelations> {
    constructor(dataSource: MongoDbDataSource);
}
