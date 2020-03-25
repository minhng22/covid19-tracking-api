import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { County } from '../models';
import { CountyRepository } from '../repositories';
export declare class CountyController {
    countyRepository: CountyRepository;
    constructor(countyRepository: CountyRepository);
    create(county: Omit<County, 'id'>): Promise<County>;
    count(where?: Where<County>): Promise<Count>;
    find(filter?: Filter<County>): Promise<County[]>;
    updateAll(county: County, where?: Where<County>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<County>): Promise<County>;
    updateById(id: string, county: County): Promise<void>;
    replaceById(id: string, county: County): Promise<void>;
    deleteById(id: string): Promise<void>;
}
