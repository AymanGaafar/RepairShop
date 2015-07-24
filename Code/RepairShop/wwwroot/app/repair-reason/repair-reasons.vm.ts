module App.ViewModels
{
    export class RepairReasonsViewModel extends ListBaseViewModel<Models.RepairReason>
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static $inject = ListBaseViewModel.$inject.concat(["$scope"]);
        public static get controllerId(): string { return "RepairReasonsViewModel"; }

        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties
        //#endregion

        //#region Constructors

        public constructor($http, $q, $location, breezeFactory,
            private $scope: IListBaseScope<RepairReasonsViewModel>)
        {
            super($http, $q, $location, breezeFactory);

            $scope.vm = this;

            this.toolbar.title = "All Repair Reasons";
            this.toolbar.summary = "View all repair reasons";
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
                .from("RepairReasons")
                .where(predicate)
                .orderBy("Title")
                .skip(this._navigationQuery.skip)
                .inlineCount(this._navigationQuery.includeCount);

            return query;
        }

        public newEntity(): void
        {
            this.$location.url(Models.RepairReason.newUrl);
        }

        //#endregion
    }

    class RepairReasonsRouteConfigurator
    {
        public static $inject = ['$routeProvider'];

        public constructor($routeProvider: ng.route.IRouteProvider)
        {
            // RepairReasons List
            $routeProvider.when(Models.RepairReason.listUrl, {
                templateUrl: "/App/RepairReasons",
                controller: "RepairReasonsViewModel"
            });
        }
    }

    class RepairReasonsSidebarConfigurator
    {
        public static $inject = [Services.SidebarProvider.serviceId + "Provider"];

        public constructor(SidebarProvider: Services.ISidebarProvider)
        {
            SidebarProvider.addItem({
                title: "Repair Reasons",
                url: Models.RepairReason.listUrl,
                icon: "perm_device_information",
                order: 7,
                subCommands: [{
                    title: "Add New Repair Reason",
                    url: Models.RepairReason.newUrl,
                    icon: "add",
                    order: 0
                }]
            });
        }
    }

    // Init
    angular.module(Config.appName)
        .controller(RepairReasonsViewModel.controllerId, RepairReasonsViewModel)
        .config(RepairReasonsRouteConfigurator)
        .config(RepairReasonsSidebarConfigurator);
}