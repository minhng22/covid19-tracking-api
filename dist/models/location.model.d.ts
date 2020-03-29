import { Entity } from '@loopback/repository';
export declare class Location extends Entity {
    id?: string;
    long: string;
    lat: string;
    time_stampt: string;
    profile_id: string;
    constructor(data?: Partial<Location>);
}
export interface LocationRelations {
}
export declare type LocationWithRelations = Location & LocationRelations;
