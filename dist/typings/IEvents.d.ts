import ISubscription = require("./ISubscription");
interface IEvents {
    clear(): IEvents;
    on(event: string, listener: (event: string, args: any) => void, context?: any): ISubscription;
    off(listener: any): IEvents;
    trigger(event: string, args: any): IEvents;
}
export = IEvents;
