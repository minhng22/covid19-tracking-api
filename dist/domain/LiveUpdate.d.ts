import { LiveUpdateController } from '../controllers/live-update.controller';
export declare class LiveUpdate {
    protected cronController: LiveUpdateController;
    constructor(cronController: LiveUpdateController);
    start(): Promise<void>;
    private eachHour;
}
