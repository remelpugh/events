interface ISubscriber {
    context?: any;
    listener: (topic: string, ...args: any[]) => any;
    token: string;
}
export = ISubscriber;
