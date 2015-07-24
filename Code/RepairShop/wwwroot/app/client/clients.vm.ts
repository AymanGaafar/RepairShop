module App.ViewModels
{
    export class ClientsViewModel extends ListBaseViewModel<Models.Client>
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static $inject = ListBaseViewModel.$inject.concat(["$scope"]);
        public static get controllerId(): string { return "ClientsViewModel"; }

        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties
        //#endregion

        //#region Constructors

        public constructor($http, $q, $location, breezeFactory,
            private $scope: IListBaseScope<ClientsViewModel>)
        {
            super($http, $q, $location, breezeFactory);

            $scope.vm = this;

            this.toolbar.title = "All Clients";
            this.toolbar.summary = "View all clients";
        }

        //#endregion

        //#region Private Methods
        //#endregion

        //#region Public Methods

        public getQuery(): breeze.EntityQuery
        {
            var containsOperator = "Contains";

            var predicate = breeze.Predicate.create("Code", containsOperator, this.query)
                .or("concat(concat(FirstName,'' ''), LastName)", containsOperator, this.query)
                .or("FirstName", containsOperator, this.query)
                .or("LastName", containsOperator, this.query);
            var query = new breeze.EntityQuery()
                .from("Clients")
                .where(predicate)
                .orderBy("FirstName")
                .orderBy("LastName")
                .orderBy("Code")
                .skip(this._navigationQuery.skip)
                .inlineCount(this._navigationQuery.includeCount);

            return query;
        }

        public newEntity(): void
        {
            this.$location.url(Models.Client.newUrl);
        }

        //#endregion
    }

    class ClientsRouteConfigurator
    {
        public static $inject = ['$routeProvider'];

        public constructor($routeProvider: ng.route.IRouteProvider)
        {
            // Clients List
            $routeProvider.when(Models.Client.listUrl, {
                templateUrl: "/App/Clients",
                controller: "ClientsViewModel"
            });
        }
    }

    class ClientsSidebarConfigurator
    {
        public static $inject = [Services.SidebarProvider.serviceId + "Provider"];

        public constructor(SidebarProvider: Services.ISidebarProvider)
        {
            SidebarProvider.addItem({
                title: "Clients",
                url: Models.Client.listUrl,
                icon: "face",
                order: 2,
                subCommands: [{
                    title: "Add New Client",
                    url: Models.Client.newUrl,
                    icon: "add",
                    order: 0
                }]
            });
        }
    }

    // Init
    angular.module(Config.appName)
        .controller(ClientsViewModel.controllerId, ClientsViewModel)
        .config(ClientsRouteConfigurator)
        .config(ClientsSidebarConfigurator);
}