/**
 * Created by remelpugh on 11/4/2014.
 */
interface ISubscriber {
    context?: any;
    listener: (topic: string, ...args: any[]) => any;
    token: string;
}

export = ISubscriber;