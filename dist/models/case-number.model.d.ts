import { Entity } from '@loopback/repository';
export declare class CaseNumber extends Entity {
    no: number;
    medicalType: string;
    id?: string;
    territoryType: string;
    territoryId: string;
    timeStampt: string;
    constructor(data?: Partial<CaseNumber>);
}
export interface CaseNumberRelations {
}
export declare type CaseNumberWithRelations = CaseNumber & CaseNumberRelations;
