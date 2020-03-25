import { BindingAddress, BindingKey } from './binding-key';
import { Context } from './context';
import { ResolutionOptions } from './resolution-session';
import { ValueOrPromise } from './value-promise';
/**
 * Resolver for configuration of bindings. It's responsible for finding
 * corresponding configuration for a given binding key.
 *
 * By default, `undefined` is expected if no configuration is provided. The
 * behavior can be overridden by setting `optional` to `false` in resolution
 * options.
 */
export interface ConfigurationResolver {
    /**
     * Resolve config for the binding key
     *
     * @param key - Binding key
     * @param propertyPath - Property path for the option. For example, `x.y`
     * requests for `<config>.x.y`. If not set, the `config` object will be
     * returned.
     * @param resolutionOptions - Options for the resolution.
     * - optional: if not set or set to `true`, `undefined` will be returned if
     * no corresponding value is found. Otherwise, an error will be thrown.
     */
    getConfigAsValueOrPromise<ConfigValueType>(key: BindingAddress<unknown>, propertyPath?: string, resolutionOptions?: ResolutionOptions): ValueOrPromise<ConfigValueType | undefined>;
}
/**
 * Resolver for configurations of bindings
 */
export declare class DefaultConfigurationResolver implements ConfigurationResolver {
    readonly context: Context;
    constructor(context: Context);
    getConfigAsValueOrPromise<ConfigValueType>(key: BindingAddress<unknown>, propertyPath?: string, resolutionOptions?: ResolutionOptions): ValueOrPromise<ConfigValueType | undefined>;
}
/**
 * Create binding key for configuration of the binding
 * @param key - Binding key for the target binding
 * @param propertyPath - Property path for the configuration
 */
export declare function configBindingKeyFor<ConfigValueType = unknown>(key: BindingAddress, propertyPath?: string): BindingKey<ConfigValueType>;
