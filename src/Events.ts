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
        const events = this.events;

        for (let event in events) {
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
        const events = this.events;

        for (let event in events) {
            if (events.hasOwnProperty(event)) {
                for (let i: number = 0, length: number = events[event].length; i < length; i++) {
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
        const eventNames = event.split(",");
        const uid: string = utils.generateUUID();

        for (let eventName of eventNames) {
            if (!this.events[eventName]) {
                this.events[eventName] = [];
            }

            let subscriber: ISubscriber;

            subscriber = {
                context: context,
                listener: listener,
                uid: uid
            };

            this.events[eventName].push(subscriber);
        }

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
        const eventNames = event.split(",");

        for (let eventName of eventNames) {
            if (!this.events[eventName]) {
                continue;
            }

            const subscribers: ISubscriber[] = this.events[eventName];
            let length: number = subscribers ? subscribers.length : 0;

            while (length--) {
                let subscriber: ISubscriber = subscribers[length];

                subscriber.listener.call(subscriber.context, eventName, args);
            }
        }

        return this;
    }
}

var events: IEvents = new Events();

export = events;
