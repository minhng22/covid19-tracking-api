import { ApplicationWithRepositories } from '@loopback/repository';
import { ArtifactOptions } from '../types';
import { BaseArtifactBooter } from './base-artifact.booter';
/**
 * A class that extends BaseArtifactBooter to boot the 'Repository' artifact type.
 * Discovered repositories are bound using `app.repository()` which must be added
 * to an Application using the `RepositoryMixin` from `@loopback/repository`.
 *
 * Supported phases: configure, discover, load
 *
 * @param app - Application instance
 * @param projectRoot - Root of User Project relative to which all paths are resolved
 * @param bootConfig - Repository Artifact Options Object
 */
export declare class RepositoryBooter extends BaseArtifactBooter {
    app: ApplicationWithRepositories;
    repositoryOptions: ArtifactOptions;
    constructor(app: ApplicationWithRepositories, projectRoot: string, repositoryOptions?: ArtifactOptions);
    /**
     * Uses super method to get a list of Artifact classes. Boot each class by
     * binding it to the application using `app.repository(repository);` if present.
     */
    load(): Promise<void>;
}
/**
 * Default ArtifactOptions for RepositoryBooter.
 */
export declare const RepositoryDefaults: ArtifactOptions;
