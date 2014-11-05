/**
 * Created by remelpugh on 11/4/2014.
 */
module Utilities {
    export var generateUUID = (): string => {
        var d: number  = new Date().getTime();

        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c: string) => {
            var r: number = (d + Math.random() * 16) % 16 | 0;

            d = Math.floor(d / 16);

            return (c === "x" ? r : (r & 0x7 | 0x8)).toString(16);
        });
    }
}

export = Utilities;