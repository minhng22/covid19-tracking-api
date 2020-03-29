import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Location } from '../models';
import { LocationRepository } from '../repositories';
export declare class LocationControllerController {
    locationRepository: LocationRepository;
    constructor(locationRepository: LocationRepository);
    create(location: Omit<Location, 'id'>): Promise<Location>;
    count(where?: Where<Location>): Promise<Count>;
    find(filter?: Filter<Location>): Promise<Location[]>;
    updateAll(location: Location, where?: Where<Location>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Location>): Promise<Location>;
    updateById(id: string, location: Location): Promise<void>;
    replaceById(id: string, location: Location): Promise<void>;
    deleteById(id: string): Promise<void>;
}
