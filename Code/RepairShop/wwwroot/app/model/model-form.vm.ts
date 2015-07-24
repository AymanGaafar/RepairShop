module App.ViewModels
{
    export class ModelFormViewModel extends FormBaseViewModel <Models.Model>
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static $inject = FormBaseViewModel.$inject.concat(["$scope", Services.CacheService.serviceId]);
        public static get controllerId(): string { return "ModelFormViewModel"; }

        //#endregion

        //#region Private Properties
        
        private _lookups: Helpers.IModelFormLookups = null;

        //#endregion

        //#region Public Properties

        public get lookups(): Helpers.IModelFormLookups { return this._lookups; }

        //#endregion

        //#region Constructors

        constructor($http, $q, $location, $route, $routeParams, zStorageWip, breezeFactory,
            private $scope: IFormBaseScope<ModelFormViewModel>, private cacheFactory: Services.CacheService)
        {
            super($http,
                $q,
                $location,
                $route,
                $routeParams,
                zStorageWip,
                breezeFactory,
                breezeFactory.entityManager.metadataStore.getEntityType("Model"),
                Models.Model.newUrl,
                Models.Model.listUrl,
                { ModelId: breeze.core.getUuid() });

            $scope.vm = this;

            this.retrieveLookups();
        }

        //#endregion

        //#region Private Methods

        private retrieveLookups(): void
        {
            var entityManager = this.breezeFactory.entityManager;

            if (this.cacheFactory.hasItem(Models.Brand.cacheListName))
            {
                this._lookups =
                {
                    brands: this.cacheFactory.getItem<Helpers.IKeyValueResult<string, string>[]>(Models.Brand.cacheListName)
                };
            }
            else
            {
                this.$http.post<Helpers.IModelFormLookups>("/odata/Models/FormLookups", {})
                    .success((data: Helpers.IModelFormLookups) =>
                {
                    this.cacheFactory.setItem(Models.Brand.cacheListName, data.brands);

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
                query = new breeze.EntityQuery().from("Models")
                    .where(new breeze.Predicate(Models.Model.lookupProperty, "eq", this.$routeParams[Models.Model.lookupProperty]));
            }

            return query;
        }

        protected getWipKey(): string
        {
            if (!this.isNew)
            {
                return Models.Model.getWipKey(this.$routeParams[Models.Model.lookupProperty]);
            }

            return Models.Model.getWipKey();
        }

        //#endregion

        //#region Public Methods

        public newBrand(): void
        {
            this.$location.url(Models.Brand.newUrl + "?returnUrl=" + encodeURIComponent(this.$location.url()));
        }

        public refreshBrands(): void
        {
        }

        //#endregion
    }

    class ModelFormRouteConfigurator
    {
        public static $inject = ['$routeProvider'];

        public constructor($routeProvider: ng.route.IRouteProvider)
        {
            // New Model
            $routeProvider.when(Models.Model.newUrl, {
                templateUrl: "/App/ModelForm",
                controller: "ModelFormViewModel"
            });
            
            // Edit Model
            $routeProvider.when(Models.Model.editUrl, {
                templateUrl: "/App/ModelForm",
                controller: "ModelFormViewModel"
            });
        }
    }

    // Init
    angular.module(Config.appName)
        .controller(ModelFormViewModel.controllerId, ModelFormViewModel)
        .config(ModelFormRouteConfigurator);
}