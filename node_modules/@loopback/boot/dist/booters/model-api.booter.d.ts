import { Getter } from '@loopback/core';
import { ModelApiBuilder } from '@loopback/model-api-builder';
import { ApplicationWithRepositories } from '@loopback/repository';
import { ArtifactOptions } from '../types';
import { BaseArtifactBooter } from './base-artifact.booter';
export declare class ModelApiBooter extends BaseArtifactBooter {
    app: ApplicationWithRepositories;
    getModelApiBuilders: Getter<ModelApiBuilder[]>;
    booterConfig: ArtifactOptions;
    constructor(app: ApplicationWithRepositories, projectRoot: string, getModelApiBuilders: Getter<ModelApiBuilder[]>, booterConfig?: ArtifactOptions);
    /**
     * Load the the model config files
     */
    load(): Promise<void>;
    /**
     * Set up the loaded model classes
     */
    setupModel(configFile: string): Promise<void>;
    /**
     * Retrieve the API builder that matches the pattern provided
     * @param pattern - name of pattern for an API builder
     */
    getApiBuilderForPattern(pattern: string): Promise<ModelApiBuilder>;
}
/**
 * Default ArtifactOptions for ControllerBooter.
 */
export declare const RestDefaults: ArtifactOptions;
