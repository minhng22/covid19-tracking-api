import { CaseNumberRepository, CountryRepository, CountyRepository, UsStatesRepository } from '../repositories';
export declare class LiveUpdateController {
    private usStatesRepository;
    private caseNumberRepository;
    private countyRepository;
    private countryRepository;
    constructor(usStatesRepository: UsStatesRepository, caseNumberRepository: CaseNumberRepository, countyRepository: CountyRepository, countryRepository: CountryRepository);
    liveUpdateStateData(): Promise<void>;
    liveUpdateCA(state: any): Promise<void>;
    liveUpdateNY(state: any): Promise<void>;
    liveUpdateTotalTable(state: any): Promise<void>;
    extractInteger(chars: string): number;
    liveUpdateCountryData(): Promise<void>;
    innerText(page: any, elementHandle: any): Promise<any>;
    nextEl(page: any, elementHandle: any): Promise<any>;
    getCurrentDateTime(): string;
    isNumeric(c: string): Boolean;
    isSpecialChar(c: string): Boolean;
    isAlphabet(c: string): Boolean;
    liveUpdateMN(state: any): Promise<void>;
    updateArticleDB(): Promise<void>;
    liveUpdateText(state: any): Promise<void>;
}
