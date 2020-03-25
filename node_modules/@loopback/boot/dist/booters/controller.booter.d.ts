import { Application } from '@loopback/core';
import { ArtifactOptions } from '../types';
import { BaseArtifactBooter } from './base-artifact.booter';
/**
 * A class that extends BaseArtifactBooter to boot the 'Controller' artifact type.
 * Discovered controllers are bound using `app.controller()`.
 *
 * Supported phases: configure, discover, load
 *
 * @param app - Application instance
 * @param projectRoot - Root of User Project relative to which all paths are resolved
 * @param bootConfig - Controller Artifact Options Object
 */
export declare class ControllerBooter extends BaseArtifactBooter {
    app: Application;
    controllerConfig: ArtifactOptions;
    constructor(app: Application, projectRoot: string, controllerConfig?: ArtifactOptions);
    /**
     * Uses super method to get a list of Artifact classes. Boot each class by
     * binding it to the application using `app.controller(controller);`.
     */
    load(): Promise<void>;
}
/**
 * Default ArtifactOptions for ControllerBooter.
 */
export declare const ControllerDefaults: ArtifactOptions;
