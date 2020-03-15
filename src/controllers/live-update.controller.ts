// Uncomment these imports to begin using these cool features!
// import {inject} from '@loopback/context';


export class LiveUpdateController {
  constructor() {}

  async liveUpdateStateData() {
    let cheerio = require('cheerio');
    let request = require('request');

    const r = await function (resolve: any, reject: any) {
      request('http://xmfan.com/guide.php',
        function (err: any, response: any, body: any) {
          if (err) reject(err);
          if (response.statusCode !== 200) {
            reject('Invalid status code: ' + response.statusCode);
          }
          let $ = cheerio.load(body);
          let channelList = $('td[width=140]');

          let channels = [];

          for (let i = 0; i < channelList.length; i++) {
            let t = channelList.get(i);
            let channel = $(t).text();
            let artistNode = $(t).next();
            let artist = $(artistNode).text();
            let title = $(artistNode).next().text();

            console.log(channel + '-' + artist + '-' + title);
            channels.push({channel: channel, artist: artist, title: title});
          }

          resolve(channels);

        });
    }
    console.log('do something here')
  }
}
