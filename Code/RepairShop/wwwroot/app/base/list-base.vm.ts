module App.ViewModels
{
    export interface IListBaseScope<T extends BaseViewModel> extends IBaseScope<T>
    {
    }

    export class ListBaseViewModel<T extends Models.BaseModel> extends BaseViewModel
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static get $inject()
        {
            return ["$http", "$q", "$location", Services.BreezeService.serviceId];
        };

        //#endregion

        //#region Private Properties
        //#endregion

        //#region Protected Properties

        protected _count: number = 0;
        protected _ms: T[] = [];
        protected _navigationQuery: UIComponents.ODataPaginatorPageQuery = new UIComponents.ODataPaginatorPageQuery(0, true);
        protected _toolbar: Helpers.IToolbar = {
            title: "All Entities",
            summary: "View all entities",
            backColor: "#547FBB",
            color: "white",
            actions: [
                {
                    title: "",
                    tooltip: null,//{ title: "New", position: App.Components.TooltipPosition[App.Components.TooltipPosition.bottom] },
                    icon: "add",
                    color: "white",
                    click: (e) => this.newEntity()
                },
                {
                    title: "",
                    tooltip: null,//{ title: "Refresh", position: App.Components.TooltipPosition[App.Components.TooltipPosition.bottom] },
                    icon: "refresh",
                    color: "white",
                    backColor: "transparent",
                    click: (e) => this.refresh()
                }
            ]
        };
        
        //#endregion

        //#region Public Properties        

        public get count(): number { return this._count; }
        public get ms(): T[] { return this._ms; }
        public query: string = '';
        public get toolbar(): Helpers.IToolbar { return this._toolbar; }
        
        //#endregion

        //#region Constructors

        public constructor(protected $http: ng.IHttpService,
            protected $q: ng.IQService,
            protected $location: ng.ILocationService,
            protected breezeFactory: Services.BreezeService)
        {
            super();

            if (breezeFactory.entityManager.hasChanges())
                breezeFactory.entityManager.rejectChanges();

            this.refresh();
        }

        //#endregion

        //#region Private Methods        
        //#endregion

        //#region Public Methods

        public delete(entity: T): ng.IPromise<void>
        {
            let deferred = this.$q.defer<void>();

            if (confirm("Are you sure you want to remove " + entity.toString() + " ?"))
            {
                entity.entityAspect.setDeleted();

                this.breezeFactory.entityManager.saveChanges()
                    .then(() =>
                {
                    this.ms.splice(this.ms.indexOf(entity), 1);

                    deferred.resolve();
                }).catch((reason) =>
                {
                    //console.error(reason);

                    deferred.reject(reason);
                });
            }

            return deferred.promise;
        }

        public getQuery(): breeze.EntityQuery
        {
            throw "Not Implemented";
        }

        public navigated(e: UIComponents.IODataPaginatorNavigatedEventArgs): void
        {
            this._navigationQuery = e.currentPageQuery;

            this.refresh();
        }

        public newEntity(): void
        {
            throw "Not Implemented";
        }

        public onQueryKeyPress(event: KeyboardEvent): void
        {
            if (event.keyCode == 13) // Enter
                this.refresh();
        }

        public refresh(): ng.IPromise<T[]>
        {
            this.status.isBusy = true;
            this.status.title = "Updating information, stay tuned.";
            this.status.description = "";

            let deferred = this.$q.defer<T[]>();
            var entityManager = this.breezeFactory.entityManager;
            var query = this.getQuery();

            entityManager.executeQuery(query).then((data) =>
            {
                this._ms = <T[]> data.results;
                this._count = data.inlineCount;

                deferred.resolve(this._ms);
            }, (reason) =>
            {
                //console.error(reason);

                deferred.reject(reason);
            });

            deferred.promise.finally(() =>
            {
                this.status.isBusy = false;
                this.status.title = this.status.description = "";
            });

            return deferred.promise;
        }

        //#endregion
    }
}