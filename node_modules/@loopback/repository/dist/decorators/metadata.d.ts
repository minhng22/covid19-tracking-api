import { InspectionOptions } from '@loopback/context';
import { ModelDefinition } from '../model';
export declare class ModelMetadataHelper {
    /**
     * A utility function to simplify retrieving metadata from a target model and
     * its properties.
     * @param target - The class from which to retrieve metadata.
     * @param options - An options object for the MetadataInspector to customize
     * the output of the metadata retrieval functions.
     */
    static getModelMetadata(target: Function, options?: InspectionOptions): ModelDefinition | {};
}
