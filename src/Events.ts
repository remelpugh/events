/// <reference path="./EventArgs.ts"/>
/// <reference path="./ISubscriber.ts"/>
/// <reference path="./ISubscriberOptions.ts" />
/// <reference path="./ISubscription.ts"/>
/**
 * Simple Pub/Sub typescript implementation.
 */
class Events {
    public static events: any = {};

    /**
     * Removes all event subscriptions.
     * @returns {Events}
     */
    public static clear(): Events {
        const events = Events.events;

        for (let event in events) {
            if (events.hasOwnProperty(event)) {
                delete events[event];
            }
        }

        return this;
    }

    /**
     * Creates an {EventArgs} whiched can be used triggering an event.
     * @param  {string}    name [description]
     * @return {EventArgs}      [description]
     */
    public static create(name: string): EventArgs {
        return new EventArgs(name);
    }

    /**
     * Remove a listener from a specific event, based on a tokenized reference to the subscription.
     * @param listener The token specified in the subscription.
     * @returns {Events}
     */
    public static off(listener: any): Events {
        const events = Events.events;

        for (let event in events) {
            if (events.hasOwnProperty(event)) {
                for (let i = 0, length = events[event].length; i < length; i++) {
                    if (typeof (listener) === "string") {
                        if (events[event][i].uid === listener) {
                            events[event].splice(i, 1);

                            return this;
                        }
                    }
                    if (typeof (listener) === "function") {
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
     * @param event     The name of the event.
     * @param listener  The callback function called when the event has been published.
     * @param options
     * @param context   The context of this in the callback function.
     * @returns {ISubscription|ISubscription[]}
     */
    public static on(event: string,
        listener: (e: EventArgs, args: any) => void,
        options: ISubscriberOptions = {},
        context?: any): ISubscription | ISubscription[] {
        const eventNames = event.split(/[,\s]+/);
        const subscriptions: ISubscription[] = [];
        let uid;

        for (let eventName of eventNames) {
            uid = this.generateUUID();

            if (!this.events[eventName]) {
                this.events[eventName] = [];
            }

            let subscriber: ISubscriber = {
                context: context,
                listener: listener,
                priority: 0 || options.priority,
                uid: uid
            };

            let events = this.events[eventName];

            events.push(subscriber);
            events = events.sort((a: ISubscriber, b: ISubscriber) => {
                return (a.priority > b.priority ? -1 : a.priority === b.priority ? 0 : 1);
            });

            this.events[eventName] = events;

            subscriptions.push({
                remove: (): Events => {
                    return Events.off(uid);
                },
                uid: uid
            });
        }

        if (eventNames.length > 0) {
            return subscriptions;
        }

        return subscriptions[0];
    }

    /**
     * Trigger events of interest and arguments such as the data to pass along.
     * @param event The name of the event.
     * @param args The args passed to the event subscribers.
     * @returns {Events}
     */
    public static trigger(event: string|EventArgs, args?: any): Events {
        let eventArgs: EventArgs = null;
        let eventNames: string[] = [];

        if (event instanceof EventArgs) {
            eventArgs = event;
            eventNames = event.name.split(/[,\s]+/);
        }
        else if (typeof event === "string") {
            eventNames = event.split(/[,\s]+/);
        }

        for (let eventName of eventNames) {
            if (!this.events[eventName]) {
                continue;
            }

            let e: EventArgs = (eventArgs === null) ? new EventArgs(eventName) : eventArgs;
            const subscribers: ISubscriber[] = this.events[eventName];

            for (let subscriber of subscribers) {
                // subscriber has cancelled this event so the rest of the subscribers will not be notified
                if (e.isDefaultPrevented()) {
                    continue;
                }

                subscriber.listener.call(subscriber.context, e, args);
            }
        }

        return this;
    }

    /* tslint:disable:no-bitwise */
    private static generateUUID(): string {
        let d: number = new Date().getTime();

        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c: string) => {
            d = Math.floor(d / 16);

            let r: number = (d + Math.random() * 16) % 16 | 0;

            return (c === "x" ? r : (r & 0x7 | 0x8)).toString(16);
        });
    }
}
