import { NamespacedReflect } from './reflect';
import { DecoratorType, DesignTimeMethodMetadata, MetadataKey, MetadataMap } from './types';
/**
 * Options for inspection
 */
export interface InspectionOptions {
    /**
     * Only inspect own metadata of a given target. The prototype chain will not
     * be checked. The implementation uses `Reflect.getOwnMetadata()` if the flag
     * is set to `true`. Otherwise, it uses `Reflect.getMetadata()`.
     *
     * The flag is `false` by default for `MetadataInspector`.
     */
    ownMetadataOnly?: boolean;
}
/**
 * Inspector for metadata applied by decorators
 */
export declare class MetadataInspector {
    /**
     * Expose Reflector, which is a wrapper of `Reflect` and it uses `loopback`
     * as the namespace prefix for all metadata keys
     */
    static readonly Reflector: NamespacedReflect;
    /**
     * Expose the reflector for TypeScript design-time metadata
     */
    static readonly DesignTimeReflector: NamespacedReflect;
    /**
     * Get the metadata associated with the given key for a given class
     * @param key - Metadata key
     * @param target - Class that contains the metadata
     * @param options - Options for inspection
     */
    static getClassMetadata<T>(key: MetadataKey<T, ClassDecorator>, target: Function, options?: InspectionOptions): T | undefined;
    /**
     * Define metadata for the given target
     * @param key - Metadata key
     * @param value - Metadata value
     * @param target - Target for the metadata
     * @param member - Optional property or method name
     */
    static defineMetadata<T>(key: MetadataKey<T, DecoratorType>, value: T, target: Object, member?: string): void;
    /**
     * Get the metadata associated with the given key for all methods of the
     * target class or prototype
     * @param key - Metadata key
     * @param target - Class for static methods or prototype for instance methods
     * @param options - Options for inspection
     */
    static getAllMethodMetadata<T>(key: MetadataKey<T, MethodDecorator>, target: Object, options?: InspectionOptions): MetadataMap<T> | undefined;
    /**
     * Get the metadata associated with the given key for a given method of the
     * target class or prototype
     * @param key - Metadata key
     * @param target - Class for static methods or prototype for instance methods
     * @param methodName - Method name. If not present, default to '' to use
     * the constructor
     * @param options - Options for inspection
     */
    static getMethodMetadata<T>(key: MetadataKey<T, MethodDecorator>, target: Object, methodName?: string, options?: InspectionOptions): T | undefined;
    /**
     * Get the metadata associated with the given key for all properties of the
     * target class or prototype
     * @param key - Metadata key
     * @param target - Class for static methods or prototype for instance methods
     * @param options - Options for inspection
     */
    static getAllPropertyMetadata<T>(key: MetadataKey<T, PropertyDecorator>, target: Object, options?: InspectionOptions): MetadataMap<T> | undefined;
    /**
     * Get the metadata associated with the given key for a given property of the
     * target class or prototype
     * @param key - Metadata key
     * @param target - Class for static properties or prototype for instance
     * properties
     * @param propertyName - Property name
     * @param options - Options for inspection
     */
    static getPropertyMetadata<T>(key: MetadataKey<T, PropertyDecorator>, target: Object, propertyName: string, options?: InspectionOptions): T | undefined;
    /**
     * Get the metadata associated with the given key for all parameters of a
     * given method
     * @param key - Metadata key
     * @param target - Class for static methods or prototype for instance methods
     * @param methodName - Method name. If not present, default to '' to use
     * the constructor
     * @param options - Options for inspection
     */
    static getAllParameterMetadata<T>(key: MetadataKey<T, ParameterDecorator>, target: Object, methodName?: string, options?: InspectionOptions): T[] | undefined;
    /**
     * Get the metadata associated with the given key for a parameter of a given
     * method by index
     * @param key - Metadata key
     * @param target - Class for static methods or prototype for instance methods
     * @param methodName - Method name. If not present, default to '' to use
     * the constructor
     * @param index - Index of the parameter, starting with 0
     * @param options - Options for inspection
     */
    static getParameterMetadata<T>(key: MetadataKey<T, ParameterDecorator>, target: Object, methodName: string, index: number, options?: InspectionOptions): T | undefined;
    /**
     * Get TypeScript design time type for a property
     * @param target - Class or prototype
     * @param propertyName - Property name
     */
    static getDesignTypeForProperty(target: Object, propertyName: string): Function;
    /**
     * Get TypeScript design time type for a method
     * @param target - Class or prototype
     * @param methodName - Method name
     */
    static getDesignTypeForMethod(target: Object, methodName: string): DesignTimeMethodMetadata;
}
