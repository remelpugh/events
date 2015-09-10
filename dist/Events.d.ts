declare module '/ISubscription' {
	/**
	 * Created by remelpugh on 11/4/2014.
	 */
	interface ISubscription {
	    remove: () => void;
	    uid: string;
	}
	export = ISubscription;

}
declare module '/IEvents' {
	/**
	 * Created by remelpugh on 11/5/2014.
	 */
	import ISubscription = require('/ISubscription');
	interface IEvents {
	    clear(): IEvents;
	    on(event: string, listener: (event: string, args: any) => void, context?: any): ISubscription;
	    off(listener: any): IEvents;
	    trigger(event: string, args: any): IEvents;
	}
	export = IEvents;

}
declare module '/ISubscriber' {
	/**
	 * Created by remelpugh on 11/4/2014.
	 */
	interface ISubscriber {
	    context?: any;
	    listener: (event: string, ...args: any[]) => any;
	    uid: string;
	}
	export = ISubscriber;

}
declare module '/Utilities' {
	 module Utilities {
	    /**
	     * Generates a random UUID that will be assigned to a subscription.
	     * @returns {string} The UUID generated.
	     */
	    const generateUUID: () => string;
	}
	export = Utilities;

}
declare module '/Events' {
	/**
	 * Created by remelpugh on 11/4/2014.
	 */
	import IEvents = require('/IEvents'); var events: IEvents;
	export = events;

}
