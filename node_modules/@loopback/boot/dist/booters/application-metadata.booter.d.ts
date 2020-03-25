import { Application } from '@loopback/core';
import { Booter } from '../types';
/**
 *
 * Configure the application with metadata from `package.json`
 *
 * @param app - Application instance
 * @param projectRoot - Root of User Project
 */
export declare class ApplicationMetadataBooter implements Booter {
    app: Application;
    private projectRoot;
    constructor(app: Application, projectRoot: string);
    configure(): Promise<void>;
}
