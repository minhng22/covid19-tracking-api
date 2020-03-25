const client = require('./client');
const serverApp = require('./server/dist/');
client({
  dir: 'client',
  beforeNext: async server => {
    const app = new serverApp.FrogfishServerApplication();
    await app.boot();
    server.use('/api', app.requestHandler);
  },
});
