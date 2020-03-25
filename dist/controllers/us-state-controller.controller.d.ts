import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { UsStates } from '../models';
import { UsStatesRepository } from '../repositories';
export declare class UsStateControllerController {
    usStatesRepository: UsStatesRepository;
    constructor(usStatesRepository: UsStatesRepository);
    count(where?: Where<UsStates>): Promise<Count>;
    find(filter?: Filter<UsStates>): Promise<UsStates[]>;
    updateAll(usStates: UsStates, where?: Where<UsStates>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<UsStates>): Promise<UsStates>;
}
