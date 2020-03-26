import {LiveUpdateController} from '../controllers/live-update.controller';
const cron = require('node-cron');

export class LiveUpdate {
  constructor(
    protected cronController: LiveUpdateController,
  ) {
  }

  async start() {
    this.eachHour();
  }

  private async eachHour() {
    console.log('Start Cron Jobs');

    cron.schedule('* * * * *', async () => {
      await this.cronController.liveUpdateCountryData()
      await this.cronController.liveUpdateStateData();
      console.log('Updating state data every hour');
    })
  }
}
