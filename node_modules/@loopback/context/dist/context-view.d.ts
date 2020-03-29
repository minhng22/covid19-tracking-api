/// <reference types="node" />
import { EventEmitter } from 'events';
import { Binding } from './binding';
import { BindingFilter } from './binding-filter';
import { BindingComparator } from './binding-sorter';
import { Context } from './context';
import { ContextEvent } from './context-event';
import { ContextEventType, ContextObserver } from './context-observer';
import { Subscription } from './context-subscription';
import { Getter } from './inject';
import { ResolutionSession } from './resolution-session';
import { ValueOrPromise } from './value-promise';
/**
 * An event emitted by a `ContextView`
 */
export interface ContextViewEvent<T> extends ContextEvent {
    /**
     * Optional cached value for an `unbind` event
     */
    cachedValue?: T;
}
/**
 * `ContextView` provides a view for a given context chain to maintain a live
 * list of matching bindings and their resolved values within the context
 * hierarchy.
 *
 * This class is the key utility to implement dynamic extensions for extension
 * points. For example, the RestServer can react to `controller` bindings even
 * they are added/removed/updated after the application starts.
 *
 * `ContextView` is an event emitter that emits the following events:
 * - 'bind': when a binding is added to the view
 * - 'unbind': when a binding is removed from the view
 * - 'close': when the view is closed (stopped observing context events)
 * - 'refresh': when the view is refreshed as bindings are added/removed
 * - 'resolve': when the cached values are resolved and updated
 */
export declare class ContextView<T = unknown> extends EventEmitter implements ContextObserver {
    readonly context: Context;
    readonly filter: BindingFilter;
    readonly comparator?: BindingComparator | undefined;
    /**
     * An array of cached bindings that matches the binding filter
     */
    protected _cachedBindings: Readonly<Binding<T>>[] | undefined;
    /**
     * A map of cached values by binding
     */
    protected _cachedValues: Map<Readonly<Binding<T>>, T> | undefined;
    private _subscription;
    /**
     * Create a context view
     * @param context - Context object to watch
     * @param filter - Binding filter to match bindings of interest
     * @param comparator - Comparator to sort the matched bindings
     */
    constructor(context: Context, filter: BindingFilter, comparator?: BindingComparator | undefined);
    /**
     * Update the cached values keyed by binding
     * @param values - An array of resolved values
     */
    private updateCachedValues;
    /**
     * Get an array of cached values
     */
    private getCachedValues;
    /**
     * Start listening events from the context
     */
    open(): Subscription | undefined;
    /**
     * Stop listening events from the context
     */
    close(): void;
    /**
     * Get the list of matched bindings. If they are not cached, it tries to find
     * them from the context.
     */
    get bindings(): Readonly<Binding<T>>[];
    /**
     * Find matching bindings and refresh the cache
     */
    protected findBindings(): Readonly<Binding<T>>[];
    /**
     * Listen on `bind` or `unbind` and invalidate the cache
     */
    observe(event: ContextEventType, binding: Readonly<Binding<unknown>>, context: Context): void;
    /**
     * Refresh the view by invalidating its cache
     */
    refresh(): void;
    /**
     * Resolve values for the matching bindings
     * @param session - Resolution session
     */
    resolve(session?: ResolutionSession): ValueOrPromise<T[]>;
    /**
     * Get the list of resolved values. If they are not cached, it tries to find
     * and resolve them.
     */
    values(session?: ResolutionSession): Promise<T[]>;
    /**
     * As a `Getter` function
     */
    asGetter(session?: ResolutionSession): Getter<T[]>;
    /**
     * Get the single value
     */
    singleValue(session?: ResolutionSession): Promise<T | undefined>;
}
/**
 * Create a context view as a getter with the given filter
 * @param ctx - Context object
 * @param bindingFilter - A function to match bindings
 * @param session - Resolution session
 */
export declare function createViewGetter<T = unknown>(ctx: Context, bindingFilter: BindingFilter, session?: ResolutionSession): Getter<T[]>;
/**
 * Create a context view as a getter with the given filter and sort matched
 * bindings by the comparator.
 * @param ctx - Context object
 * @param bindingFilter - A function to match bindings
 * @param bindingComparator - A function to compare two bindings
 * @param session - Resolution session
 */
export declare function createViewGetter<T = unknown>(ctx: Context, bindingFilter: BindingFilter, bindingComparator?: BindingComparator, session?: ResolutionSession): Getter<T[]>;
