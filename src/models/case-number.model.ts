import {Entity, model, property} from '@loopback/repository';

@model()
export class CaseNumber extends Entity {
  @property({
    type: 'number',
    required: true
  })
  no: number;

  @property({
    type: 'string',
    required: true,
  })
  medicalType: string;

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
  territoryType: string;

  @property({
    type: 'string',
    required: true,
  })
  territoryId: string;

  @property({
    type: 'string',
    required: true,
  })
  timeStampt: string;

  constructor(data?: Partial<CaseNumber>) {
    super(data);
  }
}

export interface CaseNumberRelations {
  // describe navigational properties here
}

export type CaseNumberWithRelations = CaseNumber & CaseNumberRelations;
