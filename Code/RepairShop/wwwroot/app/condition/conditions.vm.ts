module App.ViewModels
{
    export class ConditionsViewModel extends ListBaseViewModel<Models.Condition>
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static $inject = ListBaseViewModel.$inject.concat(["$scope"]);
        public static get controllerId(): string { return "ConditionsViewModel"; }

        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties
        //#endregion

        //#region Constructors

        public constructor($http, $q, $location, breezeFactory,
            private $scope: IListBaseScope<ConditionsViewModel>)
        {
            super($http, $q, $location, breezeFactory);

            $scope.vm = this;

            this.toolbar.title = "All Conditions";
            this.toolbar.summary = "View all conditions";
        }

        //#endregion

        //#region Private Methods
        //#endregion

        //#region Public Methods

        public getQuery(): breeze.EntityQuery
        {
            var containsOperator = "Contains";

            var predicate = breeze.Predicate.create("Name", containsOperator, this.query);
            var query = new breeze.EntityQuery()
                .from("Conditions")
                .where(predicate)
                .orderBy("Name")
                .skip(this._navigationQuery.skip)
                .inlineCount(this._navigationQuery.includeCount);

            return query;
        }

        public newEntity(): void
        {
            this.$location.url(Models.Condition.newUrl);
        }

        //#endregion
    }

    class ConditionsRouteConfigurator
    {
        public static $inject = ['$routeProvider'];

        public constructor($routeProvider: ng.route.IRouteProvider)
        {
            // Conditions List
            $routeProvider.when(Models.Condition.listUrl, {
                templateUrl: "/App/Conditions",
                controller: "ConditionsViewModel"
            });
        }
    }

    class ConditionsSidebarConfigurator
    {
        public static $inject = [Services.SidebarProvider.serviceId + "Provider"];

        public constructor(SidebarProvider: Services.ISidebarProvider)
        {
            SidebarProvider.addItem({
                title: "Conditions",
                url: Models.Condition.listUrl,
                icon: "healing",
                order: 4,
                subCommands: [{
                    title: "Add New Condition",
                    url: Models.Condition.newUrl,
                    icon: "add",
                    order: 0
                }]
            });
        }
    }

    // Init
    angular.module(Config.appName)
        .controller(ConditionsViewModel.controllerId, ConditionsViewModel)
        .config(ConditionsRouteConfigurator)
        .config(ConditionsSidebarConfigurator);
}