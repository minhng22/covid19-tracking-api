import {Entity, model, property} from '@loopback/repository';

@model()
export class UsStates extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

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
  url: string;

  @property()
  positive_case: number;

  @property()
  positive_case_recovered: number;

  @property()
  negative_case: number;

  constructor(data?: Partial<UsStates>) {
    super(data);
  }
}

export interface UsStatesRelations {
  // describe navigational properties here
}

export type UsStatesWithRelations = UsStates & UsStatesRelations;
