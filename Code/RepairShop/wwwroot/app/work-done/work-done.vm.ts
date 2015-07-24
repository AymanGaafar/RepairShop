module App.ViewModels
{
    export class WorkDoneViewModel extends ListBaseViewModel<Models.WorkDone>
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static $inject = ListBaseViewModel.$inject.concat(["$scope"]);
        public static get controllerId(): string { return "WorkDoneViewModel"; }

        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties
        //#endregion

        //#region Constructors

        public constructor($http, $q, $location, breezeFactory,
            private $scope: IListBaseScope<WorkDoneViewModel>)
        {
            super($http, $q, $location, breezeFactory);

            $scope.vm = this;

            this.toolbar.title = "All Work Done";
            this.toolbar.summary = "View all work done";
        }

        //#endregion

        //#region Private Methods
        //#endregion

        //#region Public Methods

        public getQuery(): breeze.EntityQuery
        {
            var containsOperator = "Contains";

            var predicate = breeze.Predicate.create("Title", containsOperator, this.query);
            var query = new breeze.EntityQuery()
                .from("WorkDone")
                .where(predicate)
                .orderBy("Title")
                .skip(this._navigationQuery.skip)
                .inlineCount(this._navigationQuery.includeCount);

            return query;
        }

        public newEntity(): void
        {
            this.$location.url(Models.WorkDone.newUrl);
        }

        //#endregion
    }

    class WorkDoneRouteConfigurator
    {
        public static $inject = ['$routeProvider'];

        public constructor($routeProvider: ng.route.IRouteProvider)
        {
            // WorkDone List
            $routeProvider.when(Models.WorkDone.listUrl, {
                templateUrl: "/App/WorkDone",
                controller: "WorkDoneViewModel"
            });
        }
    }

    class WorkDoneSidebarConfigurator
    {
        public static $inject = [Services.SidebarProvider.serviceId + "Provider"];

        public constructor(SidebarProvider: Services.ISidebarProvider)
        {
            SidebarProvider.addItem({
                title: "Work Done",
                url: Models.WorkDone.listUrl,
                icon: "assignment_turned_in",
                order: 8,
                subCommands: [{
                    title: "Add New Work Done",
                    url: Models.WorkDone.newUrl,
                    icon: "add",
                    order: 0
                }]
            });
        }
    }

    // Init
    angular.module(Config.appName)
        .controller(WorkDoneViewModel.controllerId, WorkDoneViewModel)
        .config(WorkDoneRouteConfigurator)
        .config(WorkDoneSidebarConfigurator);
}