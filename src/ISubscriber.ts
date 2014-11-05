/**
 * Created by remelpugh on 11/4/2014.
 */
interface ISubscriber {
    context?: any;
    listener: (event: string, ...args: any[]) => any;
    uid: string;
}

export = ISubscriber;