module App.Services
{
    export interface ISidebarItem
    {
        title: string;
        url: string;

        icon?: string;
        color?: string;

        order: number;

        subCommands?: ISidebarItem[];
    }

    export interface ISidebarProvider
    {
        items: ISidebarItem[];

        $get: any;

        addItem(item: ISidebarItem): void;
        removeItem(item: ISidebarItem): void;
    }

    export class SidebarProvider implements ISidebarProvider
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static get serviceId(): string { return "sidebar"; }

        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties

        public items: ISidebarItem[] = [];

        //#endregion

        //#region Constructors

        constructor() 
        {
        }

        //#endregion

        //#region Private Methods
        //#endregion

        //#region Public Methods
        
        $get = ['$http', ($http) =>
        {
            return this;
        }];

        addItem(item: ISidebarItem): void
        {
            this.items.push(item);
        }

        removeItem(item: ISidebarItem): void
        {
            this.items.splice(this.items.indexOf(item), 1);
        }

        //#endregion
    }
    
    // Register the service
    angular.module(Config.appName)
        .provider(SidebarProvider.serviceId, SidebarProvider);
}