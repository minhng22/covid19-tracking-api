import { Constructor } from '@loopback/context';
import { Application, LifeCycleObserver } from '@loopback/core';
import { ArtifactOptions } from '../types';
import { BaseArtifactBooter } from './base-artifact.booter';
declare type LifeCycleObserverClass = Constructor<LifeCycleObserver>;
/**
 * A class that extends BaseArtifactBooter to boot the 'LifeCycleObserver' artifact type.
 *
 * Supported phases: configure, discover, load
 *
 * @param app - Application instance
 * @param projectRoot - Root of User Project relative to which all paths are resolved
 * @param bootConfig - LifeCycleObserver Artifact Options Object
 */
export declare class LifeCycleObserverBooter extends BaseArtifactBooter {
    app: Application;
    observerConfig: ArtifactOptions;
    observers: LifeCycleObserverClass[];
    constructor(app: Application, projectRoot: string, observerConfig?: ArtifactOptions);
    /**
     * Uses super method to get a list of Artifact classes. Boot each file by
     * creating a DataSourceConstructor and binding it to the application class.
     */
    load(): Promise<void>;
}
/**
 * Default ArtifactOptions for DataSourceBooter.
 */
export declare const LifeCycleObserverDefaults: ArtifactOptions;
export {};
