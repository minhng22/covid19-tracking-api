import {DefaultCrudRepository} from '@loopback/repository';
import {CaseNumber, CaseNumberRelations} from '../models';
import {MongoDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CaseNumberRepository extends DefaultCrudRepository<
  CaseNumber,
  typeof CaseNumber.prototype.id,
  CaseNumberRelations
> {
  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource,
  ) {
    super(CaseNumber, dataSource);
  }
}
