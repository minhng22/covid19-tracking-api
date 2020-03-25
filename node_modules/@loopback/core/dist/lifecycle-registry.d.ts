import { Binding, ContextView } from '@loopback/context';
import { LifeCycleObserver } from './lifecycle';
/**
 * A group of life cycle observers
 */
export declare type LifeCycleObserverGroup = {
    /**
     * Observer group name
     */
    group: string;
    /**
     * Bindings for observers within the group
     */
    bindings: Readonly<Binding<LifeCycleObserver>>[];
};
export declare type LifeCycleObserverOptions = {
    /**
     * Control the order of observer groups for notifications. For example,
     * with `['datasource', 'server']`, the observers in `datasource` group are
     * notified before those in `server` group during `start`. Please note that
     * observers are notified in the reverse order during `stop`.
     */
    orderedGroups: string[];
    /**
     * Notify observers of the same group in parallel, default to `true`
     */
    parallel?: boolean;
};
export declare const DEFAULT_ORDERED_GROUPS: string[];
/**
 * A context-based registry for life cycle observers
 */
export declare class LifeCycleObserverRegistry implements LifeCycleObserver {
    protected readonly observersView: ContextView<LifeCycleObserver>;
    protected readonly options: LifeCycleObserverOptions;
    constructor(observersView: ContextView<LifeCycleObserver>, options?: LifeCycleObserverOptions);
    setOrderedGroups(groups: string[]): void;
    /**
     * Get observer groups ordered by the group
     */
    getObserverGroupsByOrder(): LifeCycleObserverGroup[];
    /**
     * Get the group for a given life cycle observer binding
     * @param binding - Life cycle observer binding
     */
    protected getObserverGroup(binding: Readonly<Binding<LifeCycleObserver>>): string;
    /**
     * Sort the life cycle observer bindings so that we can start/stop them
     * in the right order. By default, we can start other observers before servers
     * and stop them in the reverse order
     * @param bindings - Life cycle observer bindings
     */
    protected sortObserverBindingsByGroup(bindings: Readonly<Binding<LifeCycleObserver>>[]): LifeCycleObserverGroup[];
    /**
     * Notify an observer group of the given event
     * @param group - A group of bindings for life cycle observers
     * @param event - Event name
     */
    protected notifyObservers(observers: LifeCycleObserver[], bindings: Readonly<Binding<LifeCycleObserver>>[], event: keyof LifeCycleObserver): Promise<void>;
    /**
     * Invoke an observer for the given event
     * @param observer - A life cycle observer
     * @param event - Event name
     */
    protected invokeObserver(observer: LifeCycleObserver, event: keyof LifeCycleObserver): Promise<void>;
    /**
     * Emit events to the observer groups
     * @param events - Event names
     * @param groups - Observer groups
     */
    protected notifyGroups(events: (keyof LifeCycleObserver)[], groups: LifeCycleObserverGroup[], reverse?: boolean): Promise<void>;
    /**
     * Notify all life cycle observers by group of `start`
     */
    start(): Promise<void>;
    /**
     * Notify all life cycle observers by group of `stop`
     */
    stop(): Promise<void>;
}
