module App.ViewModels
{
    export class BrandFormViewModel extends FormBaseViewModel<Models.Brand>
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static $inject = FormBaseViewModel.$inject.concat(["$scope", Services.CacheService.serviceId]);
        public static get controllerId(): string { return "BrandFormViewModel"; }

        //#endregion

        //#region Private Properties

        private _lookups: Helpers.IBrandFormLookups = null;

        //#endregion

        //#region Public Properties
        
        public get lookups(): Helpers.IBrandFormLookups { return this._lookups; }
        
        //#endregion

        //#region Constructors

        constructor($http, $q, $location, $route, $routeParams, zStorageWip, breezeFactory,
            private $scope: IFormBaseScope<BrandFormViewModel>, private cacheFactory: Services.CacheService)
        {
            super($http,
                $q,
                $location,
                $route,
                $routeParams,
                zStorageWip,
                breezeFactory,
                breezeFactory.entityManager.metadataStore.getEntityType("Brand"),
                Models.Brand.newUrl,
                Models.Brand.listUrl,
                { BrandId: breeze.core.getUuid() });

            $scope.vm = this;

            this.retrieveLookups();
        }

        //#endregion

        //#region Private Methods

        private retrieveLookups(): void
        {
            var entityManager = this.breezeFactory.entityManager;

            if (this.cacheFactory.hasItem(Models.Company.cacheListName))
            {
                this._lookups =
                {
                    companies: this.cacheFactory.getItem<Helpers.IKeyValueResult<string, string>[]>(Models.Company.cacheListName)
                };
            }
            else
            {

                this.$http.post<Helpers.IBrandFormLookups>("/odata/Brands/FormLookups", {})
                    .success((data: Helpers.IBrandFormLookups) =>
                {
                    this.cacheFactory.setItem(Models.Company.cacheListName, data.companies);

                    this._lookups = data;
                });
            }
        }

        //#endregion

        //#region Protected Methods

        protected getQuery(): breeze.EntityQuery
        {
            let query = null;

            if (!this.isNew)
            {
                query = new breeze.EntityQuery().from("Brands")
                    .where(new breeze.Predicate(Models.Brand.lookupProperty, "eq", this.$routeParams[Models.Brand.lookupProperty]));
            }

            return query;
        }

        protected getWipKey(): string
        {
            if (!this.isNew)
            {
                return Models.Brand.getWipKey(this.$routeParams[Models.Brand.lookupProperty]);
            }

            return Models.Brand.getWipKey();
        }

        //#endregion

        //#region Public Methods

        public newCompany(): void
        {
            this.$location.url(Models.Company.newUrl + "?returnUrl=" + encodeURIComponent(this.$location.url()));
        }

        //#endregion
    }

    class BrandFormRouteConfigurator
    {
        public static $inject = ['$routeProvider'];

        public constructor($routeProvider: ng.route.IRouteProvider)
        {
            // New Brand
            $routeProvider.when(Models.Brand.newUrl, {
                templateUrl: "/App/BrandForm",
                controller: "BrandFormViewModel"
            });
            
            // Edit Brand
            $routeProvider.when(Models.Brand.editUrl, {
                templateUrl: "/App/BrandForm",
                controller: "BrandFormViewModel"
            });
        }
    }

    // Init
    angular.module(Config.appName)
        .controller(BrandFormViewModel.controllerId, BrandFormViewModel)
        .config(BrandFormRouteConfigurator);
}