module App.Helpers
{
    export interface IEvent
    {
        name: string;

        addHandler(handler: (sender: Object, eventArgs: IEventArgs) => void): void;
        fire(sender: Object, eventArgs: IEventArgs): void;
        removeHandler(handler: (sender: Object, eventArgs: IEventArgs) => void): void;
    }

    export interface IEventArgs
    {
        handled: boolean;
    }

    export class Event implements IEvent
    {
        private _name: string = "";
        private _handlers: ((sender: Object, eventArgs: IEventArgs) => void)[] = [];

        public constructor(name: string)
        {
            this.name = name;
        }

        public get name(): string
        {
            return this._name;
        }

        public addHandler(handler: (sender: Object, eventArgs: IEventArgs) => void): void
        {
            if (this._handlers.indexOf(handler) === -1)
            {
                this._handlers.push(handler);
            }
        }

        public fire(sender: Object, eventArgs: IEventArgs): void
        {
            for (var index = 0; index < this._handlers.length; index++)
            {
                var handler = this._handlers[index];

                handler(sender, eventArgs);

                if (eventArgs.handled)
                {
                    break;
                }
            }
        }

        public removeHandler(handler: (sender: Object, eventArgs: IEventArgs) => void): void
        {
            var index = this._handlers.indexOf(handler);

            if (index !== -1)
            {
                this._handlers.splice(index, 1);
            }
        }
    }
}