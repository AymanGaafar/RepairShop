module App.ViewModels
{
    export class ModelDetailsViewModel extends DetailsBaseViewModel <Models.Model>
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static $inject = DetailsBaseViewModel.$inject.concat(["$scope"]);
        static get controllerId(): string { return "ModelDetailsViewModel"; }

        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties
        //#endregion

        //#region Constructors

        public constructor($http, $q, $location, $routeParams, breezeFactory,
            private $scope: IDetailsBaseScope<ModelDetailsViewModel>)
        {
            super($http, $q, $location, $routeParams, breezeFactory);

            $scope.vm = this;

            this.toolbar.title = "Model Details";
        }

        //#endregion

        //#region Private Methods
        //#endregion
        
        //#region Protected Methods

        protected getQuery(): breeze.EntityQuery
        {
            var query = new breeze.EntityQuery()
                .from("Models")
                .expand(["Brand", "Brand.Company", "Jobs", "Jobs.Client"])
                .where(new breeze.Predicate(Models.Model.lookupProperty, "eq", this.$routeParams[Models.Model.lookupProperty]));

            return query;
        }

        //#endregion

        //#region Public Methods

        public delete(): void
        {
            super.delete(Models.Model.listUrl);
        }

        //#endregion
    }

    class ModelDetailsRouteConfigurator
    {
        public static $inject = ['$routeProvider'];

        public constructor($routeProvider: ng.route.IRouteProvider)
        {
            // Model Details
            $routeProvider.when(Models.Model.viewUrl, {
                templateUrl: "/App/ModelDetails",
                controller: "ModelDetailsViewModel"
            });
        }
    }

    // Init
    angular.module(Config.appName)
        .controller(ModelDetailsViewModel.controllerId, ModelDetailsViewModel)
        .config(ModelDetailsRouteConfigurator);
}