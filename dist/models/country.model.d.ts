import { Entity } from '@loopback/repository';
export declare class Country extends Entity {
    id?: string;
    name: string;
    url: string;
    constructor(data?: Partial<Country>);
}
export interface CountryRelations {
}
export declare type CountryWithRelations = Country & CountryRelations;
