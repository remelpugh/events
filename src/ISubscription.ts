/**
 * Created by remelpugh on 11/4/2014.
 */
interface ISubscription {
    remove: () => void;
    token: string;
}

export = ISubscription;