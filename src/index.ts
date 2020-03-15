import {ApplicationConfig} from '@loopback/core';
import {CovidTrackingApiApplication} from './application';
import {LiveUpdateController} from './controllers';
import {LiveUpdate} from './domain/LiveUpdate';

export {CovidTrackingApiApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new CovidTrackingApiApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  // Instanciate CronController
  const cronController = app.controller(LiveUpdateController);

  // Get Instance
  const cronControllerInstance = await cronController.getValue(app);

  // Inject by constructor
  const cron = new LiveUpdate(cronControllerInstance);

  // Invoke method
  cron.start();

  return app;
}
