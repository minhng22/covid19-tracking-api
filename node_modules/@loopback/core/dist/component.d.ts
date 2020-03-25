import { Binding, BoundValue, Constructor, Provider } from '@loopback/context';
import { Application, ControllerClass } from './application';
import { LifeCycleObserver } from './lifecycle';
import { Server } from './server';
/**
 * A map of provider classes to be bound to a context
 */
export interface ProviderMap {
    [key: string]: Constructor<Provider<BoundValue>>;
}
/**
 * A map of classes to be bound to a context
 */
export interface ClassMap {
    [key: string]: Constructor<BoundValue>;
}
/**
 * A component declares a set of artifacts so that they cane be contributed to
 * an application as a group
 */
export interface Component {
    /**
     * An array of controller classes
     */
    controllers?: ControllerClass[];
    /**
     * A map of providers to be bound to the application context
     *
     * @example
     * ```ts
     * {
     *   'authentication.strategies.ldap': LdapStrategyProvider
     * }
     * ```
     */
    providers?: ProviderMap;
    /**
     * A map of classes to be bound to the application context.
     *
     * @example
     * ```ts
     * {
     *   'rest.body-parsers.xml': XmlBodyParser
     * }
     * ```
     */
    classes?: ClassMap;
    /**
     * A map of name/class pairs for servers
     */
    servers?: {
        [name: string]: Constructor<Server>;
    };
    lifeCycleObservers?: Constructor<LifeCycleObserver>[];
    /**
     * An array of bindings to be aded to the application context.
     *
     * @example
     * ```ts
     * const bindingX = Binding.bind('x').to('Value X');
     * this.bindings = [bindingX]
     * ```
     */
    bindings?: Binding[];
    /**
     * Other properties
     */
    [prop: string]: any;
}
/**
 * Mount a component to an Application.
 *
 * @param app - Application
 * @param component - Component instance
 */
export declare function mountComponent(app: Application, component: Component): void;
