module App.ViewModels
{
    export class JobDetailsViewModel extends DetailsBaseViewModel <Models.Job>
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static $inject = DetailsBaseViewModel.$inject.concat(["$scope"]);
        public static get controllerId(): string { return "JobDetailsViewModel"; }

        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties
        //#endregion

        //#region Constructors

        public constructor($http, $q, $location, $routeParams, breezeFactory,
            private $scope: IDetailsBaseScope<JobDetailsViewModel>)
        {
            super($http, $q, $location, $routeParams, breezeFactory);

            $scope.vm = this;

            this.toolbar.title = "Job Details";
            this.toolbar.actions.push({
                backColor: "transparent",
                click: () => this.print(),
                color: "white",
                icon: "print",
                title: "Print",
                tooltip: null
            });
        }

        //#endregion

        //#region Private Methods
        //#endregion

        //#region Protected Methods

        protected getQuery(): breeze.EntityQuery
        {
            var query = new breeze.EntityQuery()
                .from("Jobs")
                .expand(["Client", "WorkDoneBy", "Condition", "Model", "Model.Brand", "Model.Brand.Company",
                "JobRepairReasons", "JobRepairReasons.RepairReason", "JobWorkDone", "JobWorkDone.WorkDone"])
                .where(new breeze.Predicate(Models.Job.lookupProperty, "eq", this.$routeParams[Models.Job.lookupProperty]));

            return query;
        }

        //#endregion

        //#region Public Methods

        public delete(): void
        {
            super.delete(Models.Job.listUrl);
        }

        public print(): void
        {
            window.open("/printjob/" + this.m.Code);
        }

        //#endregion
    }

    class JobDetailsRouteConfigurator
    {
        public static $inject = ['$routeProvider'];

        public constructor($routeProvider: ng.route.IRouteProvider)
        {
            // Job Details
            $routeProvider.when(Models.Job.viewUrl, {
                templateUrl: "/App/JobDetails",
                controller: "JobDetailsViewModel"
            });
        }
    }

    // Init
    angular.module(Config.appName)
        .controller(JobDetailsViewModel.controllerId, JobDetailsViewModel)
        .config(JobDetailsRouteConfigurator);
}