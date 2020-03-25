/// <reference types="node" />
import { EventEmitter } from 'events';
import { Context } from './context';
import { ContextEvent, ContextEventListener } from './context-event';
import { ContextEventObserver, ContextObserver } from './context-observer';
/**
 * Subscription of context events. It's modeled after
 * https://github.com/tc39/proposal-observable.
 */
export interface Subscription {
    /**
     * unsubscribe
     */
    unsubscribe(): void;
    /**
     * Is the subscription closed?
     */
    closed: boolean;
}
/**
 * Event data for observer notifications
 */
export interface Notification extends ContextEvent {
    /**
     * A snapshot of observers when the original event is emitted
     */
    observers: Set<ContextEventObserver>;
}
/**
 * Manager for context observer subscriptions
 */
export declare class ContextSubscriptionManager extends EventEmitter {
    protected readonly context: Context;
    /**
     * A listener to watch parent context events
     */
    protected _parentContextEventListener?: ContextEventListener;
    /**
     * A list of registered context observers. The Set will be created when the
     * first observer is added.
     */
    protected _observers: Set<ContextEventObserver> | undefined;
    /**
     * Internal counter for pending notification events which are yet to be
     * processed by observers.
     */
    private pendingNotifications;
    /**
     * Queue for background notifications for observers
     */
    private notificationQueue;
    constructor(context: Context);
    /**
     * @internal
     */
    get parentContextEventListener(): ContextEventListener | undefined;
    /**
     * @internal
     */
    get observers(): Set<ContextEventObserver> | undefined;
    /**
     * Wrap the debug statement so that it always print out the context name
     * as the prefix
     * @param args - Arguments for the debug
     */
    private _debug;
    /**
     * Set up an internal listener to notify registered observers asynchronously
     * upon `bind` and `unbind` events. This method will be called lazily when
     * the first observer is added.
     */
    private setupEventHandlersIfNeeded;
    private handleParentEvent;
    /**
     * A strongly-typed method to emit context events
     * @param type Event type
     * @param event Context event
     */
    private emitEvent;
    /**
     * Emit an `error` event
     * @param err Error
     */
    private emitError;
    /**
     * Start a background task to listen on context events and notify observers
     */
    private startNotificationTask;
    /**
     * Publish an event to the registered observers. Please note the
     * notification is queued and performed asynchronously so that we allow fluent
     * APIs such as `ctx.bind('key').to(...).tag(...);` and give observers the
     * fully populated binding.
     *
     * @param event - Context event
     * @param observers - Current set of context observers
     */
    protected notifyObservers(event: ContextEvent, observers?: Set<ContextEventObserver> | undefined): Promise<void>;
    /**
     * Process notification events as they arrive on the queue
     */
    private processNotifications;
    /**
     * Listen on given event types and emit `notification` event. This method
     * merge multiple event types into one for notification.
     * @param eventTypes - Context event types
     */
    private setupNotification;
    /**
     * Wait until observers are notified for all of currently pending notification
     * events.
     *
     * This method is for test only to perform assertions after observers are
     * notified for relevant events.
     */
    waitUntilPendingNotificationsDone(timeout?: number): Promise<void>;
    /**
     * Add a context event observer to the context
     * @param observer - Context observer instance or function
     */
    subscribe(observer: ContextEventObserver): Subscription;
    /**
     * Remove the context event observer from the context
     * @param observer - Context event observer
     */
    unsubscribe(observer: ContextEventObserver): boolean;
    /**
     * Check if an observer is subscribed to this context
     * @param observer - Context observer
     */
    isSubscribed(observer: ContextObserver): boolean;
    /**
     * Handle errors caught during the notification of observers
     * @param err - Error
     */
    private handleNotificationError;
    /**
     * Close the context: clear observers, stop notifications, and remove event
     * listeners from its parent context.
     *
     * @remarks
     * This method MUST be called to avoid memory leaks once a context object is
     * no longer needed and should be recycled. An example is the `RequestContext`,
     * which is created per request.
     */
    close(): void;
}
