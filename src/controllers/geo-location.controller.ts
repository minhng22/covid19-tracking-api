// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/context';
import {get} from '@loopback/rest';
import {LocationRepository} from '../repositories';


export class GeoLocationController {
  constructor(
    @inject('repositories.CaseNumberRepository') private locationRepository: LocationRepository,
  ) {}

  @get('/geolocation/profile')
  getProfileInGeoLocation() {

  }
}
