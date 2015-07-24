module App.Services
{
    export interface ICacheService
    {
        size: number;

        clear(): void;
        getItem<T extends Object>(key: string): T;
        hasItem(key: string): boolean;
        removeItem(key: string): boolean;
        setItem<T extends Object>(key: string, value: T): ICacheService;
    }

    export class CacheService implements ICacheService
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static $inject = ["$http"];
        public static get serviceId(): string { return "cacheService"; }
        
        //#endregion

        //#region Private Properties

        private _Cache: Map<string, Object> = new Map<string, Object>();

        //#endregion

        //#region Public Properties

        public get size(): number { return this._Cache.size; }

        //#endregion

        //#region Constructors

        constructor(private $http: ng.IHttpService) 
        {
        }

        //#endregion

        //#region Private Methods
        //#endregion

        //#region Public Methods

        public clear(): void
        {
            this._Cache.clear();
        }

        public getItem<T extends Object>(key: string): T
        {
            if (this._Cache.has(key))
            {
                return <T> this._Cache.get(key);
            }

            return null;
        }

        public hasItem(key: string): boolean
        {
            return this._Cache.has(key);
        }

        public removeItem(key: string): boolean
        {
            if (this._Cache.has(key))
            {
                return this._Cache.delete(key);
            }

            return false;
        }

        public setItem<T extends Object>(key: string, value: T): ICacheService
        {
            this._Cache.set(key, value);

            return this;
        }

        //#endregion
    }
    
    // Register the service
    angular.module(Config.appName)
        .service(CacheService.serviceId, CacheService);
}