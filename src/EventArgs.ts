import {IEventArgs} from "./IEventArgs";

export class EventArgs implements IEventArgs {
    private isPrevented = false;

    constructor(public name: string, public sender?: any) {
    }

    public preventDefault(): void {
        this.isPrevented = true;
    }

    public isDefaultPrevented(): boolean {
        return this.isPrevented;
    }
}
