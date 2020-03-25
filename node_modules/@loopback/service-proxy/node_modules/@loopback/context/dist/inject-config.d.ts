import { BindingAddress } from './binding-key';
import { InjectionMetadata } from './inject';
/**
 * Injection metadata for `@config.*`
 */
export interface ConfigInjectionMetadata extends InjectionMetadata {
    /**
     * Property path to retrieve the configuration of the target binding, for
     * example, `rest.host`.
     */
    propertyPath?: string;
    /**
     * Customize the target binding key from which the configuration is fetched.
     * If not specified, the configuration of the current binding that contains
     * the injection is used.
     */
    fromBinding?: BindingAddress;
}
/**
 * Inject a property from `config` of the current binding. If no corresponding
 * config value is present, `undefined` will be injected as the configuration
 * binding is resolved with `optional: true` by default.
 *
 * @example
 * ```ts
 * class Store {
 *   constructor(
 *     @config('x') public optionX: number,
 *     @config('y') public optionY: string,
 *   ) { }
 * }
 *
 * ctx.configure('store1', { x: 1, y: 'a' });
 * ctx.configure('store2', { x: 2, y: 'b' });
 *
 * ctx.bind('store1').toClass(Store);
 * ctx.bind('store2').toClass(Store);
 *
 * const store1 = ctx.getSync('store1');
 * expect(store1.optionX).to.eql(1);
 * expect(store1.optionY).to.eql('a');
 *
 * const store2 = ctx.getSync('store2');
 * expect(store2.optionX).to.eql(2);
 * expect(store2.optionY).to.eql('b');
 * ```
 *
 * @param propertyPath - Optional property path of the config. If is `''` or not
 * present, the `config` object will be returned.
 * @param metadata - Optional metadata to help the injection
 */
export declare function config(propertyPath?: string | ConfigInjectionMetadata, metadata?: ConfigInjectionMetadata): (target: Object, member: string | undefined, methodDescriptorOrParameterIndex?: number | TypedPropertyDescriptor<any> | undefined) => void;
export declare namespace config {
    /**
     * `@inject.getter` decorator to inject a config getter function
     * @param propertyPath - Optional property path of the config object
     * @param metadata - Injection metadata
     */
    const getter: (propertyPath?: string | ConfigInjectionMetadata | undefined, metadata?: ConfigInjectionMetadata | undefined) => (target: Object, member: string | undefined, methodDescriptorOrParameterIndex?: number | TypedPropertyDescriptor<any> | undefined) => void;
    /**
     * `@inject.view` decorator to inject a config context view to allow dynamic
     * changes in configuration
     * @param propertyPath - Optional property path of the config object
     * @param metadata - Injection metadata
     */
    const view: (propertyPath?: string | ConfigInjectionMetadata | undefined, metadata?: ConfigInjectionMetadata | undefined) => (target: Object, member: string | undefined, methodDescriptorOrParameterIndex?: number | TypedPropertyDescriptor<any> | undefined) => void;
}
