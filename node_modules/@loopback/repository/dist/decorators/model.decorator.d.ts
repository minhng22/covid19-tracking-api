import { MetadataAccessor, MetadataMap } from '@loopback/context';
import { ModelDefinition, ModelDefinitionSyntax, PropertyDefinition, PropertyType } from '../model';
export declare const MODEL_KEY: MetadataAccessor<Partial<ModelDefinitionSyntax>, ClassDecorator>;
export declare const MODEL_PROPERTIES_KEY: MetadataAccessor<PropertyDefinition, PropertyDecorator>;
export declare const MODEL_WITH_PROPERTIES_KEY: MetadataAccessor<ModelDefinition, ClassDecorator>;
export declare type PropertyMap = MetadataMap<PropertyDefinition>;
/**
 * Decorator for model definitions
 * @param definition
 * @returns A class decorator for `model`
 */
export declare function model(definition?: Partial<ModelDefinitionSyntax>): (target: Function & {
    definition?: ModelDefinition | undefined;
}) => void;
/**
 * Build model definition from decorations
 * @param target - Target model class
 * @param def - Model definition spec
 */
export declare function buildModelDefinition(target: Function & {
    definition?: ModelDefinition | undefined;
}, def?: ModelDefinitionSyntax): ModelDefinition;
/**
 * Decorator for model properties
 * @param definition
 * @returns A property decorator
 */
export declare function property(definition?: Partial<PropertyDefinition>): PropertyDecorator;
export declare namespace property {
    const ERR_PROP_NOT_ARRAY = "@property.array can only decorate array properties!";
    const ERR_NO_ARGS = "decorator received less than two parameters";
    /**
     *
     * @param itemType - The type of array items.
     * Examples: `number`, `Product`, `() => Order`.
     * @param definition - Optional PropertyDefinition object for additional
     * metadata
     */
    function array(itemType: PropertyType, definition?: Partial<PropertyDefinition>): (target: object, propertyName: string) => void;
}
