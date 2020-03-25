"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = require("./application");
exports.CovidTrackingApiApplication = application_1.CovidTrackingApiApplication;
const controllers_1 = require("./controllers");
const LiveUpdate_1 = require("./domain/LiveUpdate");
async function main(options = {}) {
    const app = new application_1.CovidTrackingApiApplication(options);
    await app.boot();
    await app.start();
    const url = app.restServer.url;
    console.log(`Server is running at ${url}`);
    console.log(`Try ${url}/ping`);
    // Instanciate CronController
    const cronController = app.controller(controllers_1.LiveUpdateController);
    const cronControllerInstance = await cronController.getValue(app);
    const cron = new LiveUpdate_1.LiveUpdate(cronControllerInstance);
    // Invoke method
    cron.start();
    return app;
}
exports.main = main;
//# sourceMappingURL=index.js.map