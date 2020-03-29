"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cron = require('node-cron');
class LiveUpdate {
    constructor(cronController) {
        this.cronController = cronController;
    }
    async start() {
        this.eachHour();
    }
    async eachHour() {
        console.log('Start Cron Jobs');
        cron.schedule('* * * * *', async () => {
            await this.cronController.liveUpdateCountryData();
            await this.cronController.liveUpdateStateData();
            console.log('Updating state data every hour');
        });
    }
}
exports.LiveUpdate = LiveUpdate;
//# sourceMappingURL=LiveUpdate.js.map