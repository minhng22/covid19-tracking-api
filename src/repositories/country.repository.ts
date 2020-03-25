import {DefaultCrudRepository} from '@loopback/repository';
import {Country, CountryRelations} from '../models';
import {MongoDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CountryRepository extends DefaultCrudRepository<
  Country,
  typeof Country.prototype.id,
  CountryRelations
> {
  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource,
  ) {
    super(Country, dataSource);
  }
}
