import {DefaultCrudRepository} from '@loopback/repository';
import {County, CountyRelations} from '../models';
import {MongoDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CountyRepository extends DefaultCrudRepository<
  County,
  typeof County.prototype.id,
  CountyRelations
> {
  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource,
  ) {
    super(County, dataSource);
  }
}
