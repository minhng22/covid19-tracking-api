import { BindingKey } from '@loopback/context';
import { RestExplorerComponent } from './rest-explorer.component';
import { RestExplorerConfig } from './rest-explorer.types';
/**
 * Binding keys used by this component.
 */
export declare namespace RestExplorerBindings {
    const COMPONENT: BindingKey<RestExplorerComponent>;
    const CONFIG: import("@loopback/context").BindingAddress<RestExplorerConfig>;
}
