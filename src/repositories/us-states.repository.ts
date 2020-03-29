import {DefaultCrudRepository} from '@loopback/repository';
import {UsStates, UsStatesRelations} from '../models';
import {MongoDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UsStatesRepository extends DefaultCrudRepository<
  UsStates,
  typeof UsStates.prototype.id,
  UsStatesRelations
> {
  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource,
  ) {
    super(UsStates, dataSource);
  }
}
