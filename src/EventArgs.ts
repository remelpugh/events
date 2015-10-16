/// <reference path="./IEventArgs.ts"/>
class EventArgs implements IEventArgs {
    private isPrevented = false;

    constructor(public name: string) {
    }

    public preventDefault(): void {
        this.isPrevented = true;
    }

    public isDefaultPrevented(): boolean {
        return this.isPrevented;
    }
}
