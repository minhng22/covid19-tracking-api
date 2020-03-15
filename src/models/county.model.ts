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
    type: 'number',
    required: true,
    default: 0,
  })
  negative_case: number;

  @property({
    type: 'number',
    required: true,
  })
  positive_case: number;

  @property({
    type: 'number',
    required: true,
  })
  positive_recovered_case: number;


  constructor(data?: Partial<County>) {
    super(data);
  }
}

export interface CountyRelations {
  // describe navigational properties here
}

export type CountyWithRelations = County & CountyRelations;
