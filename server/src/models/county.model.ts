import {Entity, model, property} from '@loopback/repository';

@model()
export class County extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  usStateId: string;

  constructor(data?: Partial<County>) {
    super(data);
  }
}

export interface CountyRelations {
  // describe navigational properties here
}

export type CountyWithRelations = County & CountyRelations;
