module App.ViewModels
{
    export class WorkDoneDetailsViewModel extends DetailsBaseViewModel <Models.WorkDone>
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static $inject = DetailsBaseViewModel.$inject.concat(["$scope"]);
        static get controllerId(): string { return "WorkDoneDetailsViewModel"; }

        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties
        //#endregion

        //#region Constructors

        public constructor($http, $q, $location, $routeParams, breezeFactory,
            private $scope: IDetailsBaseScope<WorkDoneDetailsViewModel>)
        {
            super($http, $q, $location, $routeParams, breezeFactory);

            $scope.vm = this;

            this.toolbar.title = "Work Done Details";
        }

        //#endregion

        //#region Private Methods
        //#endregion
        
        //#region Protected Methods

        protected getQuery(): breeze.EntityQuery
        {
            var query = new breeze.EntityQuery()
                .from("WorkDone")
                .expand(["JobWorkDone", "JobWorkDone.Job", "JobWorkDone.Job.Client"])
                .where(new breeze.Predicate(Models.WorkDone.lookupProperty, "eq", this.$routeParams[Models.WorkDone.lookupProperty]));

            return query;
        }

        //#endregion

        //#region Public Methods

        public delete(): void
        {
            super.delete(Models.WorkDone.listUrl);
        }

        //#endregion
    }

    class WorkDoneDetailsRouteConfigurator
    {
        public static $inject = ['$routeProvider'];

        public constructor($routeProvider: ng.route.IRouteProvider)
        {
            // WorkDone Details
            $routeProvider.when(Models.WorkDone.viewUrl, {
                templateUrl: "/App/WorkDoneDetails",
                controller: "WorkDoneDetailsViewModel"
            });
        }
    }

    // Init
    angular.module(Config.appName)
        .controller(WorkDoneDetailsViewModel.controllerId, WorkDoneDetailsViewModel)
        .config(WorkDoneDetailsRouteConfigurator);
}