import { Entity } from '@loopback/repository';
export declare class UsStates extends Entity {
    name: string;
    id?: string;
    url: string;
    constructor(data?: Partial<UsStates>);
}
export interface UsStatesRelations {
}
export declare type UsStatesWithRelations = UsStates & UsStatesRelations;
