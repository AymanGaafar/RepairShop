module App.ViewModels
{
    export class JobsViewModel extends ListBaseViewModel<Models.Job>
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static $inject = ListBaseViewModel.$inject.concat(["$scope"]);
        static get controllerId(): string { return "JobsViewModel"; }
        
        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties
        //#endregion

        //#region Constructors

        public constructor($http, $q, $location, breezeFactory,
            private $scope: IListBaseScope<JobsViewModel>)
        {
            super($http, $q, $location, breezeFactory);

            $scope.vm = this;

            this.toolbar.title = "All Jobs";
            this.toolbar.summary = "View all jobs";
        }

        //#endregion

        //#region Private Methods
        //#endregion

        //#region Public Methods

        public getQuery(): breeze.EntityQuery
        {
            var containsOperator = "Contains";

            var predicate = breeze.Predicate.create("Code", containsOperator, this.query)
                .or("IMEINumber", containsOperator, this.query);
            var query = new breeze.EntityQuery()
                .from("Jobs")
                .expand("Client")
                .where(predicate)
                .orderBy("Code")
                .skip(this._navigationQuery.skip)
                .inlineCount(this._navigationQuery.includeCount);

            return query;
        }

        public newEntity(): void
        {
            this.$location.url(Models.Job.newUrl);
        }

        //#endregion
    }

    class JobsRouteConfigurator
    {
        public static $inject = ['$routeProvider'];

        public constructor($routeProvider: ng.route.IRouteProvider)
        {
            // Jobs List
            $routeProvider.when(Models.Job.listUrl, {
                templateUrl: "/App/Jobs",
                controller: "JobsViewModel"
            });
        }
    }

    class JobsSidebarConfigurator
    {
        public static $inject = [Services.SidebarProvider.serviceId + "Provider"];

        public constructor(SidebarProvider: Services.ISidebarProvider)
        {
            SidebarProvider.addItem({
                title: "Jobs",
                url: Models.Job.listUrl,
                icon: "view_carousel",
                order: 1,
                subCommands: [{
                    title: "Add New Job",
                    url: Models.Job.newUrl,
                    icon: "add",
                    order: 0
                }]
            });
        }
    }

    // Init
    angular.module(Config.appName)
        .controller(JobsViewModel.controllerId, JobsViewModel)
        .config(JobsRouteConfigurator)
        .config(JobsSidebarConfigurator);
}