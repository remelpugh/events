declare module 'events/IEventArgs' {
	export interface IEventArgs {
	    name: string;
	    isDefaultPrevented: () => boolean;
	    preventDefault: () => void;
	}

}
declare module 'events/ISubscriber' {
	import { IEventArgs } from 'events/IEventArgs';
	export interface ISubscriber {
	    context?: any;
	    listener: (e: IEventArgs, ...args: any[]) => any;
	    priority: number;
	    uid: string;
	}

}
declare module 'events/ISubscriberOptions' {
	export interface ISubscriberOptions {
	    priority?: number;
	}

}
declare module 'events/ISubscription' {
	export interface ISubscription {
	    remove: () => void;
	    uid: string;
	}

}
declare module 'events/EventArgs' {
	import { IEventArgs } from 'events/IEventArgs';
	export class EventArgs implements IEventArgs {
	    name: string;
	    sender: any;
	    private isPrevented;
	    constructor(name: string, sender?: any);
	    preventDefault(): void;
	    isDefaultPrevented(): boolean;
	}

}
declare module 'events/Events' {
	import { ISubscriberOptions } from 'events/ISubscriberOptions';
	import { ISubscription } from 'events/ISubscription';
	import { EventArgs } from 'events/EventArgs';
	/**
	 * Custom subscription type
	 */
	export type Subscription = ISubscription | ISubscription[];
	/**
	 * Simple Pub/Sub typescript implementation.
	 */
	export class Events {
	    static events: any;
	    /**
	     * Removes all event subscriptions.
	     * @returns {Events}
	     */
	    static clear(): Events;
	    /**
	     * Creates an {EventArgs} whiched can be used triggering an event.
	     * @param  {string}     name    The name of the event.
	     * @param  {any}        sender  The sender of this event.
	     * @return {EventArgs}
	     */
	    static create(name: string, sender?: any): EventArgs;
	    /**
	     * Remove a listener from a specific event, based on a tokenized reference to the subscription.
	     * @param listener The token specified in the subscription.
	     * @returns {Events}
	     */
	    static off(listener: any): Events;
	    /**
	     * Subscribe to events of interest with a specific topic name and a callback function, to be executed when the
	     * topic/event is observed
	     * @param event     The name of the event.
	     * @param listener  The callback function called when the event has been published.
	     * @param options
	     * @param context   The context of this in the callback function.
	     * @returns {Subscription}
	     */
	    static on(event: string, listener: (e: EventArgs, args: any) => void, options?: ISubscriberOptions, context?: any): Subscription;
	    /**
	     * Trigger events of interest and arguments such as the data to pass along.
	     * @param event The name of the event.
	     * @param args The args passed to the event subscribers.
	     * @returns {Events}
	     */
	    static trigger(event: string | EventArgs, args?: any): Events;
	    private static generateUid();
	}

}
