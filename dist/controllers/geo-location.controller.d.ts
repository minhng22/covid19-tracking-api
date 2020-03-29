import { LocationRepository } from '../repositories';
export declare class GeoLocationController {
    private locationRepository;
    constructor(locationRepository: LocationRepository);
    getProfileInGeoLocation(): void;
}
