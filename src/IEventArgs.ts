export interface IEventArgs {
    name: string;
    isDefaultPrevented: () => boolean;
    preventDefault: () => void;
}
