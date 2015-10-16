/// <reference path="./EventArgs.ts"/>
interface ISubscriber {
    context?: any;
    listener: (e: EventArgs, ...args: any[]) => any;
    priority: number;
    uid: string;
}
