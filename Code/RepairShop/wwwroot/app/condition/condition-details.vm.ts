module App.ViewModels
{
    export class ConditionDetailsViewModel extends DetailsBaseViewModel <Models.Condition>
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static $inject = DetailsBaseViewModel.$inject.concat(["$scope"]);
        static get controllerId(): string { return "ConditionDetailsViewModel"; }

        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties
        //#endregion

        //#region Constructors

        public constructor($http, $q, $location, $routeParams, breezeFactory,
            private $scope: IDetailsBaseScope<ConditionDetailsViewModel>)
        {
            super($http, $q, $location, $routeParams, breezeFactory);

            $scope.vm = this;

            this.toolbar.title = "Condition Details";
        }

        //#endregion

        //#region Private Methods
        //#endregion
        
        //#region Protected Methods

        protected getQuery(): breeze.EntityQuery
        {
            var query = new breeze.EntityQuery()
                .from("Conditions")
                .expand(["Jobs", "Jobs.Client"])
                .where(new breeze.Predicate(Models.Condition.lookupProperty, "eq", this.$routeParams[Models.Condition.lookupProperty]));

            return query;
        }

        //#endregion

        //#region Public Methods

        public delete(): void
        {
            super.delete(Models.Condition.listUrl);
        }

        //#endregion
    }

    class ConditionDetailsRouteConfigurator
    {
        public static $inject = ['$routeProvider'];

        public constructor($routeProvider: ng.route.IRouteProvider)
        {
            // Condition Details
            $routeProvider.when(Models.Condition.viewUrl, {
                templateUrl: "/App/ConditionDetails",
                controller: "ConditionDetailsViewModel"
            });
        }
    }

    // Init
    angular.module(Config.appName)
        .controller(ConditionDetailsViewModel.controllerId, ConditionDetailsViewModel)
        .config(ConditionDetailsRouteConfigurator);
}