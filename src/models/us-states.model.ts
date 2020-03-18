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

  constructor(data?: Partial<UsStates>) {
    super(data);
  }
}

export interface UsStatesRelations {
  // describe navigational properties here
}

export type UsStatesWithRelations = UsStates & UsStatesRelations;
