/**
 * Created by remelpugh on 11/4/2014.
 */
/**
 * Utilities methods used by the Events.
 */
module Utilities {
    /**
     * Generates a random UUID that will be assigned to a subscription.
     * @returns {string} The UUID generated.
     */
    export const generateUUID = (): string => {
        var d: number  = new Date().getTime();

        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c: string) => {
            var r: number = (d + Math.random() * 16) % 16 | 0;

            d = Math.floor(d / 16);

            return (c === "x" ? r : (r & 0x7 | 0x8)).toString(16);
        });
    };
}

export = Utilities;