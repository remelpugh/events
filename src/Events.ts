/**
 * Created by remelpugh on 11/4/2014.
 */
import IEvents = require("./IEvents");
import ISubscriber = require("./ISubscriber");
import ISubscription = require("./ISubscription");
import utils = require("./Utilities");

/**
 * Simple Pub/Sub javascript implementation.
 */
class Events implements IEvents {
    topics: any = {};

    /**
     * Publish or broadcast events of interest with a specific topic name and arguments such as the data to pass along.
     * @param topic The topic name of the event.
     * @param args The args passed to the event subscribers.
     * @returns {IEvents}
     */
    publish(topic: string, args: any): IEvents {
        if (!this.topics[topic]) {
            return this;
        }

        var subscribers: ISubscriber[] = this.topics[topic];
        var len: number = subscribers ? subscribers.length : 0;

        while (len--) {
            var subscriber: ISubscriber = subscribers[len];

            subscriber.listener.call(subscriber.context, topic, args);
        }

        return this;
    }

    /**
     * Subscribe to events of interest with a specific topic name and a callback function, to be executed when the
     * topic/event is observed
     * @param topic The topic name of the event.
     * @param listener The callback function called when the event has been published.
     * @param context
     * @returns {ISubscription}
     */
    subscribe(topic: string, listener: (topic: string, args: any) => void, context?: any): ISubscription {
        if (!this.topics[topic]) {
            this.topics[topic] = [];
        }

        var subscriber: ISubscriber;
        var token: string = utils.generateUUID();

        subscriber = {
            context: context,
            listener: listener,
            token: token
        };

        this.topics[topic].push(subscriber);

        //noinspection JSUnusedGlobalSymbols
        return {
            remove: () => {
                this.unsubscribe(token);
            },
            token: token
        }
    }

    /**
     * Unsubscribe from a specific topic, based on a tokenized reference to the subscription.
     * @param token The token specified in the subscription.
     * @returns {IEvents}
     */
    unsubscribe(token: string): IEvents {
        var topics = this.topics;

        for (var topic in topics) {
            if (topics.hasOwnProperty(topic)) {
                for (var i: number = 0, length: number = topics[topic].length; i < length; i++) {
                    if (topics[topic][i].token === token) {
                        topics[topic].splice(i, 1);

                        return this;
                    }
                }
            }
        }

        return this;
    }
}

var events: IEvents = new Events();

export = events;