interface ISubscriber {
    context?: any;
    listener: (event: string, ...args: any[]) => any;
    uid: string;
}
export = ISubscriber;
