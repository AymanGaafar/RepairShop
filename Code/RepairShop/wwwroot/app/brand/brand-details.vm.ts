module App.ViewModels
{
    export class BrandDetailsViewModel extends DetailsBaseViewModel <Models.Brand>
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static $inject = DetailsBaseViewModel.$inject.concat(["$scope"]);
        public static get controllerId(): string { return "BrandDetailsViewModel"; }

        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties
        //#endregion

        //#region Constructors

        public constructor($http, $q, $location, $routeParams, breezeFactory,
            private $scope: IDetailsBaseScope<BrandDetailsViewModel>)
        {
            super($http, $q, $location, $routeParams, breezeFactory);

            $scope.vm = this;

            this.toolbar.title = "Brand Details";
        }

        //#endregion

        //#region Private Methods
        //#endregion

        //#region Protected Methods

        protected getQuery(): breeze.EntityQuery
        {
            var query = new breeze.EntityQuery()
                .from("Brands")
                .expand(["Company", "Models"])
                .where(new breeze.Predicate(Models.Brand.lookupProperty, "eq", this.$routeParams[Models.Brand.lookupProperty]));

            return query;
        }
        
        //#endregion

        //#region Public Methods

        public delete(): void
        {
            super.delete(Models.Brand.listUrl);
        }

        //#endregion
    }

    class BrandDetailsRouteConfigurator
    {
        public static $inject = ['$routeProvider'];

        public constructor($routeProvider: ng.route.IRouteProvider)
        {
            // Brand Details
            $routeProvider.when(Models.Brand.viewUrl, {
                templateUrl: "/App/BrandDetails",
                controller: "BrandDetailsViewModel"
            });
        }
    }

    // Init
    angular.module(Config.appName)
        .controller(BrandDetailsViewModel.controllerId, BrandDetailsViewModel)
        .config(BrandDetailsRouteConfigurator);
}