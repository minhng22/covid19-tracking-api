import { Constructor, Interceptor, Provider } from '@loopback/context';
import { Application } from '@loopback/core';
import { ArtifactOptions } from '../types';
import { BaseArtifactBooter } from './base-artifact.booter';
declare type InterceptorProviderClass = Constructor<Provider<Interceptor>>;
/**
 * A class that extends BaseArtifactBooter to boot the 'InterceptorProvider' artifact type.
 *
 * Supported phases: configure, discover, load
 *
 * @param app - Application instance
 * @param projectRoot - Root of User Project relative to which all paths are resolved
 * @param bootConfig - InterceptorProvider Artifact Options Object
 */
export declare class InterceptorProviderBooter extends BaseArtifactBooter {
    app: Application;
    interceptorConfig: ArtifactOptions;
    interceptors: InterceptorProviderClass[];
    constructor(app: Application, projectRoot: string, interceptorConfig?: ArtifactOptions);
    /**
     * Uses super method to get a list of Artifact classes. Boot each file by
     * creating a DataSourceConstructor and binding it to the application class.
     */
    load(): Promise<void>;
}
/**
 * Default ArtifactOptions for InterceptorProviderBooter.
 */
export declare const InterceptorProviderDefaults: ArtifactOptions;
export {};
