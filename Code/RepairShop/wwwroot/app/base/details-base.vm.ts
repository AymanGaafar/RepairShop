module App.ViewModels
{
    export interface IDetailsBaseScope<T extends BaseViewModel> extends IBaseScope<T>
    {
    }

    export class DetailsBaseViewModel<T extends Models.BaseModel> extends BaseViewModel
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static get $inject()
        {
            return ["$http", "$q", "$location", "$routeParams", Services.BreezeService.serviceId]
        };

        //#endregion

        //#region Private Properties
        //#endregion

        //#region Protected Properties

        protected _m: T = null;
        protected _toolbar: Helpers.IToolbar = {
            title: "Entity Details",
            summary: "",
            backColor: "#7986CB",
            color: "white",
            actions: [
                {
                    title: "",
                    tooltip: null,//{ title: "Refresh", position: App.Components.TooltipPosition[App.Components.TooltipPosition.bottom] },
                    icon: "refresh",
                    color: "white",
                    click: (e) => this.refresh(false)
                },
                {
                    title: "",
                    tooltip: null,//{ title: "Edit", position: App.Components.TooltipPosition[App.Components.TooltipPosition.bottom] },
                    icon: "mode_edit",
                    color: "white",
                    click: (e) => this.edit()
                },
                {
                    title: "",
                    tooltip: null,//{ title: "Remove", position: App.Components.TooltipPosition[App.Components.TooltipPosition.bottom] },
                    icon: "delete",
                    color: "white",
                    click: (e) => this.delete()
                }
            ]
        };

        //#endregion

        //#region Public Properties
        
        public get m(): T { return this._m; }
        public get toolbar(): Helpers.IToolbar { return this._toolbar; }

        //#endregion

        //#region Constructors

        constructor(protected $http: ng.IHttpService,
            protected $q: ng.IQService,
            protected $location: ng.ILocationService,
            protected $routeParams: ng.route.IRouteParamsService,
            protected breezeFactory: Services.BreezeService)
        {
            super();

            if (breezeFactory.entityManager.hasChanges())
                breezeFactory.entityManager.rejectChanges();

            this.refresh(false)
                .then(() =>
            {
                this.toolbar.summary = "Viewing user details for " + this.m.toString();
            });
        }

        //#endregion

        //#region Private Methods
        //#endregion

        //#region Protected Methods

        protected getQuery(): breeze.EntityQuery
        {
            throw "Not Implemented";
        }

        //#endregion

        //#region Public Methods

        public delete(returnUrl: string = "/"): void
        {
            if (confirm("Are you sure you want to remove " + this.m.toString() + " ?"))
            {
                var entityManager = this.breezeFactory.entityManager;

                this.m.entityAspect.setDeleted();

                entityManager.saveChanges().then(() =>
                {
                    this.$location.url(returnUrl);
                }, (reason) =>
                    {
                        console.error(reason);
                    });
            }
        }

        public edit(): void
        {
            this.$location.url(this.m.editUrl);
        }

        public refresh(fromCache: boolean): ng.IPromise<T>
        {
            this.status.isBusy = true;
            this.status.title = "Updating information, stay tuned.";
            this.status.description = "";

            let deferred = this.$q.defer<T>();
            let entityManager = this.breezeFactory.entityManager;
            let query = this.getQuery();

            if (fromCache)
            {
                this._m = <T> entityManager.executeQueryLocally(query)[0];

                deferred.resolve(this._m);
            }

            if (!fromCache || this._m == null)
            {
                entityManager.executeQuery(query).then((data) =>
                {
                    this._m = <T> data.results[0];

                    deferred.resolve(this._m);
                }).catch((reason) =>
                {
                    //console.error(reason);

                    deferred.reject(reason);
                });
            }

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