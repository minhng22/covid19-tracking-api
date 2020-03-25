import 'reflect-metadata';
export declare class NamespacedReflect {
    private namespace?;
    /**
     * @param namespace - Namespace to bind this reflect context
     */
    constructor(namespace?: string | undefined);
    private getMetadataKey;
    /**
     * define metadata for a target class or it's property/method
     */
    defineMetadata(metadataKey: string, metadataValue: any, target: Object, propertyKey?: string): void;
    /**
     * lookup metadata from a target object and its prototype chain
     */
    getMetadata(metadataKey: string, target: Object, propertyKey?: string): any;
    /**
     * get own metadata for a target object or it's property/method
     */
    getOwnMetadata(metadataKey: string, target: Object, propertyKey?: string): any;
    /**
     * Check if the target has corresponding metadata
     * @param metadataKey - Key
     * @param target - Target
     * @param propertyKey - Optional property key
     */
    hasMetadata(metadataKey: string, target: Object, propertyKey?: string): boolean;
    hasOwnMetadata(metadataKey: string, target: Object, propertyKey?: string): boolean;
    deleteMetadata(metadataKey: string, target: Object, propertyKey?: string): boolean;
    getMetadataKeys(target: Object, propertyKey?: string): string[];
    getOwnMetadataKeys(target: Object, propertyKey?: string): string[];
    decorate(decorators: (PropertyDecorator | MethodDecorator)[], target: Object, targetKey?: string | symbol, descriptor?: PropertyDescriptor): PropertyDescriptor | Function;
    decorate(decorators: ClassDecorator[], target: Object): PropertyDescriptor | Function;
    metadata(metadataKey: string, metadataValue: any): {
        (target: Function): void;
        (target: Object, targetKey: string | symbol): void;
    };
}
export declare const Reflector: NamespacedReflect;
