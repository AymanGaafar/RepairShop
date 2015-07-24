module App.ViewModels
{
    export class CompaniesViewModel extends ListBaseViewModel<Models.Company>
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static $inject = ListBaseViewModel.$inject.concat(["$scope"]);
        public static get controllerId(): string { return "CompaniesViewModel"; }

        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties
        //#endregion

        //#region Constructors

        public constructor($http, $q, $location, breezeFactory,
            private $scope: IListBaseScope<CompaniesViewModel>)
        {
            super($http, $q, $location, breezeFactory);

            $scope.vm = this;

            this.toolbar.title = "All Companies";
            this.toolbar.summary = "View all companies";
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
                .from("Companies")
                .where(predicate)
                .orderBy("Name")
                .skip(this._navigationQuery.skip)
                .inlineCount(this._navigationQuery.includeCount);

            return query;
        }

        public newEntity(): void
        {
            this.$location.url(Models.Company.newUrl);
        }

        //#endregion
    }

    class CompaniesRouteConfigurator
    {
        public static $inject = ['$routeProvider'];

        public constructor($routeProvider: ng.route.IRouteProvider)
        {
            // Companies List
            $routeProvider.when(Models.Company.listUrl, {
                templateUrl: "/App/Companies",
                controller: "CompaniesViewModel"
            });
        }
    }

    class CompaniesSidebarConfigurator
    {
        public static $inject = [Services.SidebarProvider.serviceId + "Provider"];

        public constructor(SidebarProvider: Services.ISidebarProvider)
        {
            SidebarProvider.addItem({
                title: "Companies",
                url: Models.Company.listUrl,
                icon: "store",
                order: 5,
                subCommands: [{
                    title: "Add New Company",
                    url: Models.Company.newUrl,
                    icon: "add",
                    order: 0
                }]
            });
        }
    }

    // Init
    angular.module(Config.appName)
        .controller(CompaniesViewModel.controllerId, CompaniesViewModel)
        .config(CompaniesRouteConfigurator)
        .config(CompaniesSidebarConfigurator);
}