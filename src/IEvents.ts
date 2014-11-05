/**
 * Created by remelpugh on 11/5/2014.
 */
import ISubscription = require("./ISubscription");

interface IEvents {
    publish(topic: string, args: any): IEvents;
    subscribe(topic: string, listener: (topic: string, args: any) => void, context?: any): ISubscription;
    unsubscribe(token: string): IEvents;
}

export = IEvents;