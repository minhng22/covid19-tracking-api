import { Binding, BindingTag } from './binding';
import { Context } from './context';
import { BoundValue } from './value-promise';
/**
 * Indexer for context bindings by tag
 */
export declare class ContextTagIndexer {
    protected readonly context: Context;
    /**
     * Index for bindings by tag names
     */
    readonly bindingsIndexedByTag: Map<string, Set<Readonly<Binding<unknown>>>>;
    /**
     * A listener for binding events
     */
    private bindingEventListener;
    /**
     * A listener to maintain tag index for bindings
     */
    private tagIndexListener;
    constructor(context: Context);
    /**
     * Set up context/binding listeners and refresh index for bindings by tag
     */
    private setupTagIndexForBindings;
    /**
     * Remove tag index for the given binding
     * @param binding - Binding object
     */
    private removeTagIndexForBinding;
    /**
     * Update tag index for the given binding
     * @param binding - Binding object
     */
    private updateTagIndexForBinding;
    /**
     * Find bindings by tag leveraging indexes
     * @param tag - Tag name pattern or name/value pairs
     */
    findByTagIndex<ValueType = BoundValue>(tag: BindingTag | RegExp): Readonly<Binding<ValueType>>[];
    close(): void;
}
