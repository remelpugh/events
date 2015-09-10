/**
 * Created by remelpugh on 11/4/2014.
 */
import IEvents = require("./IEvents");
import ISubscriber = require("./ISubscriber");
import ISubscription = require("./ISubscription");
import utils = require("./Utilities");

/**
 * Simple Pub/Sub typescript implementation.
 */
class Events implements IEvents {
    events: any = {};

    /**
     * Removes all event subscriptions.
     * @returns {Events}
     */
    clear(): IEvents {
        var events = this.events;

        for (var event in events) {
            if (events.hasOwnProperty(event)) {
                delete events[event];
            }
        }

        return this;
    }

    /**
     * Remove a listener from a specific event, based on a tokenized reference to the subscription.
     * @param listener The token specified in the subscription.
     * @returns {Events}
     */
    off(listener: any): IEvents {
        var events = this.events;

        for (var event in events) {
            if (events.hasOwnProperty(event)) {
                for (var i: number = 0, length: number = events[event].length; i < length; i++) {
                    if (typeof(listener) === "string") {
                        if (events[event][i].uid === listener) {
                            events[event].splice(i, 1);

                            return this;
                        }
                    }
                    if (typeof(listener) === "function") {
                        if (events[event][i].listener === listener) {
                            events[event].splice(i, 1);

                            return this;
                        }
                    }
                }
            }
        }

        return this;
    }

    /**
     * Subscribe to events of interest with a specific topic name and a callback function, to be executed when the
     * topic/event is observed
     * @param event The name of the event.
     * @param listener The callback function called when the event has been published.
     * @param context
     * @returns {ISubscription}
     */
    on(event: string, listener: (event: string, args: any) => void, context?: any): ISubscription {
        if (!this.events[event]) {
            this.events[event] = [];
        }

        var subscriber: ISubscriber;
        var uid: string = utils.generateUUID();

        subscriber = {
            context: context,
            listener: listener,
            uid: uid
        };

        this.events[event].push(subscriber);

        return {
            remove: (): IEvents => {
                return this.off(uid);
            },
            uid: uid
        };
    }

    /**
     * Trigger events of interest and arguments such as the data to pass along.
     * @param event The name of the event.
     * @param args The args passed to the event subscribers.
     * @returns {Events}
     */
    trigger(event: string, args: any): IEvents {
        if (!this.events[event]) {
            return this;
        }

        var subscribers: ISubscriber[] = this.events[event];
        var length: number = subscribers ? subscribers.length : 0;

        while (length--) {
            var subscriber: ISubscriber = subscribers[length];

            subscriber.listener.call(subscriber.context, event, args);
        }

        return this;
    }
}

var events: IEvents = new Events();

export = events;