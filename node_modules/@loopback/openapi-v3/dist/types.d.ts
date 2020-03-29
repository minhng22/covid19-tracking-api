import { Model } from '@loopback/repository';
import { OpenAPIObject, ReferenceObject, ResponseObject, SchemaObject } from 'openapi3-ts';
export declare type OpenApiSpec = OpenAPIObject;
export * from 'openapi3-ts';
/**
 * Create an empty OpenApiSpec object that's still a valid openapi document.
 *
 * @deprecated Use `OpenApiBuilder` from `openapi3-ts` instead.
 */
export declare function createEmptyApiSpec(): OpenApiSpec;
export interface TagsDecoratorMetadata {
    tags: string[];
}
export declare type ResponseModelOrSpec = typeof Model | SchemaObject | ResponseObject | ReferenceObject;
export interface ResponseDecoratorMetadataItem {
    responseCode: number;
    contentType: string;
    responseModelOrSpec: ResponseModelOrSpec;
    description: string;
}
export declare type ResponseDecoratorMetadata = ResponseDecoratorMetadataItem[];
