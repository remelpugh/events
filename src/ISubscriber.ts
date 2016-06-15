import {IEventArgs} from "./IEventArgs";

export interface ISubscriber {
    context?: any;
    listener: (e: IEventArgs, ...args: any[]) => any;
    priority: number;
    uid: string;
}
