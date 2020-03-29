import { BindingTemplate } from '@loopback/core';
import { OpenApiSpec } from '../types';
/**
 * Typically an extension point defines an interface as the contract for
 * extensions to implement
 */
export interface OASEnhancer {
    name: string;
    modifySpec(spec: OpenApiSpec): OpenApiSpec;
}
/**
 * A binding template for spec contributor extensions
 */
export declare const asSpecEnhancer: BindingTemplate;
