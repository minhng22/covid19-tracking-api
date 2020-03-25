import { Entity } from '@loopback/repository';
export declare class County extends Entity {
    id?: string;
    name: string;
    usStateId: string;
    constructor(data?: Partial<County>);
}
export interface CountyRelations {
}
export declare type CountyWithRelations = County & CountyRelations;
