// Uncomment these imports to begin using these cool features!
// import {inject} from '@loopback/context';


export class LiveUpdateController {
  constructor() {}

  async liveUpdateStateData() {
    const cheerio = require('cheerio');
    const axios = require('axios');

    axios.get('https://www.dhs.wisconsin.gov/outbreaks/index.htm').then((response: any) => {
      const $ = cheerio.load(response.data);
      $('h5').filter(function () {
        return this.text().trim() === 'Wisconsin COVID-19 Test Results';
      }).next().text();
    })

    console.log('Finish live update state data')
  }
}
