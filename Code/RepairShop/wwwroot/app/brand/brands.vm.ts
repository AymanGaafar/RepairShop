module App.ViewModels
{
    export class BrandsViewModel extends ListBaseViewModel<Models.Brand>
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static $inject = ListBaseViewModel.$inject.concat(["$scope"]);
        public static get controllerId(): string { return "BrandsViewModel"; }

        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties
        //#endregion

        //#region Constructors

        public constructor($http, $q, $location, breezeFactory,
            private $scope: IListBaseScope<BrandsViewModel>)
        {
            super($http, $q, $location, breezeFactory);

            $scope.vm = this;

            this.toolbar.title = "All Brands";
            this.toolbar.summary = "View all brands";
        }

        //#endregion

        //#region Private Methods
        //#endregion

        //#region Public Methods

        public getQuery(): breeze.EntityQuery
        {
            var containsOperator = "Contains";

            var predicate = breeze.Predicate.create("Name", containsOperator, this.query)
                .or("concat(concat(Company.Name,'' ''), Name)", containsOperator, this.query);
            var query = new breeze.EntityQuery()
                .from("Brands")
                .expand("Company")
                .where(predicate)
                .orderBy("Name")
                .skip(this._navigationQuery.skip)
                .inlineCount(this._navigationQuery.includeCount);

            return query;
        }

        public newEntity(): void
        {
            this.$location.url(Models.Brand.newUrl);
        }
        
        //#endregion
    }

    class BrandsRouteConfigurator
    {
        public static $inject = ['$routeProvider'];

        public constructor($routeProvider: ng.route.IRouteProvider)
        {
            // Brands List
            $routeProvider.when(Models.Brand.listUrl, {
                templateUrl: "/App/Brands",
                controller: "BrandsViewModel"
            });
        }
    }

    class BrandsSidebarConfigurator
    {
        public static $inject = [Services.SidebarProvider.serviceId + "Provider"];

        public constructor(SidebarProvider: Services.ISidebarProvider)
        {
            SidebarProvider.addItem({
                title: "Brands",
                url: Models.Brand.listUrl,
                icon: "loyalty",
                order: 6,
                subCommands: [{
                    title: "Add New Brand",
                    url: Models.Brand.newUrl,
                    icon: "add",
                    order: 0
                }]
            });
        }
    }

    // Init
    angular.module(Config.appName)
        .controller(BrandsViewModel.controllerId, BrandsViewModel)
        .config(BrandsRouteConfigurator)
        .config(BrandsSidebarConfigurator);
}