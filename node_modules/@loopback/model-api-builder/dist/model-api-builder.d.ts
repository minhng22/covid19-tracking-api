import { BindingTemplate } from '@loopback/core';
import { ApplicationWithRepositories, Model } from '@loopback/repository';
import { ModelApiConfig } from './model-api-config';
/**
 * Extension Point name for Model API builders.
 */
export declare const MODEL_API_BUILDER_PLUGINS = "model-api-builders";
/**
 * Interface for extensions contributing custom API flavors.
 */
export interface ModelApiBuilder {
    readonly pattern: string;
    build(application: ApplicationWithRepositories, modelClass: typeof Model & {
        prototype: Model;
    }, config: ModelApiConfig): Promise<void>;
}
/**
 * A binding template for model API extensions
 */
export declare const asModelApiBuilder: BindingTemplate;
