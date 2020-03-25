import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { CaseNumber } from '../models';
import { CaseNumberRepository } from '../repositories';
export declare class CaseNumberController {
    caseNumberRepository: CaseNumberRepository;
    constructor(caseNumberRepository: CaseNumberRepository);
    create(caseNumber: Omit<CaseNumber, 'id'>): Promise<CaseNumber>;
    count(where?: Where<CaseNumber>): Promise<Count>;
    find(filter?: Filter<CaseNumber>): Promise<CaseNumber[]>;
    updateAll(caseNumber: CaseNumber, where?: Where<CaseNumber>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<CaseNumber>): Promise<CaseNumber>;
    updateById(id: string, caseNumber: CaseNumber): Promise<void>;
    replaceById(id: string, caseNumber: CaseNumber): Promise<void>;
    deleteById(id: string): Promise<void>;
}
