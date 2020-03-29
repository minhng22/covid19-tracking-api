import {Entity, model, property} from '@loopback/repository';

@model()
export class Location extends Entity {
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
  long: string;

  @property({
    type: 'string',
    required: true,
  })
  lat: string;

  @property({
    type: 'string',
    required: true,
  })
  time_stampt: string;

  @property({
    type: 'string',
    required: true,
  })
  profile_id: string;


  constructor(data?: Partial<Location>) {
    super(data);
  }
}

export interface LocationRelations {
  // describe navigational properties here
}

export type LocationWithRelations = Location & LocationRelations;
