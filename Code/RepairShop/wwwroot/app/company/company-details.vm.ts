module App.ViewModels
{
    export class CompanyDetailsViewModel extends DetailsBaseViewModel <Models.Company>
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static $inject = DetailsBaseViewModel.$inject.concat(["$scope"]);
        static get controllerId(): string { return "CompanyDetailsViewModel"; }

        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties
        //#endregion

        //#region Constructors

        constructor($http, $q, $location, $routeParams, breezeFactory,
            private $scope: IDetailsBaseScope<CompanyDetailsViewModel>)
        {
            super($http, $q, $location, $routeParams, breezeFactory);

            $scope.vm = this;

            this.toolbar.title = "Company Details";
        }

        //#endregion

        //#region Private Methods
        //#endregion

        //#region Protected Methods

        protected getQuery(): breeze.EntityQuery
        {
            var query = new breeze.EntityQuery()
                .from("Companies")
                .expand("Brands")
                .where(new breeze.Predicate(Models.Company.lookupProperty, "eq", this.$routeParams[Models.Company.lookupProperty]));

            return query;
        }

        //#endregion

        //#region Public Methods

        public delete(): void
        {
            super.delete(Models.Company.listUrl);
        }

        //#endregion
    }

    class CompanyDetailsRouteConfigurator
    {
        public static $inject = ['$routeProvider'];

        public constructor($routeProvider: ng.route.IRouteProvider)
        {
            // Company Details
            $routeProvider.when(Models.Company.viewUrl, {
                templateUrl: "/App/CompanyDetails",
                controller: "CompanyDetailsViewModel"
            });
        }
    }

    // Init
    angular.module(Config.appName)
        .controller(CompanyDetailsViewModel.controllerId, CompanyDetailsViewModel)
        .config(CompanyDetailsRouteConfigurator);
}