module App.ViewModels
{
    export class CompanyFormViewModel extends FormBaseViewModel <Models.Company>
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static $inject = FormBaseViewModel.$inject.concat(["$scope"]);
        public static get controllerId(): string { return "CompanyFormViewModel"; }

        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties
        //#endregion

        //#region Constructors

        constructor($http, $q, $location, $route, $routeParams, zStorageWip, breezeFactory,
            private $scope: IFormBaseScope<CompanyFormViewModel>)
        {
            super($http,
                $q,
                $location,
                $route,
                $routeParams,
                zStorageWip,
                breezeFactory,
                breezeFactory.entityManager.metadataStore.getEntityType("Company"),
                Models.Company.newUrl,
                Models.Company.listUrl,
                { CompanyId: breeze.core.getUuid() });

            $scope.vm = this;
        }

        //#endregion

        //#region Private Methods
        //#endregion

        //#region Protected Methods

        protected getQuery(): breeze.EntityQuery
        {
            let query = null;

            if (!this.isNew)
            {
                query = new breeze.EntityQuery().from("Companies")
                    .where(new breeze.Predicate(Models.Company.lookupProperty, "eq", this.$routeParams[Models.Company.lookupProperty]));
            }

            return query;
        }

        protected getWipKey(): string
        {
            if (!this.isNew)
            {
                return Models.Company.getWipKey(this.$routeParams[Models.Company.lookupProperty]);
            }

            return Models.Company.getWipKey();
        }

        //#endregion

        //#region Public Methods
        //#endregion
    }

    class CompanyFormRouteConfigurator
    {
        public static $inject = ['$routeProvider'];

        public constructor($routeProvider: ng.route.IRouteProvider)
        {
            // New Company
            $routeProvider.when(Models.Company.newUrl, {
                templateUrl: "/App/CompanyForm",
                controller: "CompanyFormViewModel"
            });
            
            // Edit Company
            $routeProvider.when(Models.Company.editUrl, {
                templateUrl: "/App/CompanyForm",
                controller: "CompanyFormViewModel"
            });
        }
    }

    // Init
    angular.module(Config.appName)
        .controller(CompanyFormViewModel.controllerId, CompanyFormViewModel)
        .config(CompanyFormRouteConfigurator);
}