module App.ViewModels
{
    export class ModelsViewModel extends ListBaseViewModel<Models.Model>
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static $inject = ListBaseViewModel.$inject.concat(["$scope"]);
        public static get controllerId(): string { return "ModelsViewModel"; }

        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties
        //#endregion

        //#region Constructors

        public constructor($http, $q, $location, breezeFactory,
            private $scope: IListBaseScope<ModelsViewModel>)
        {
            super($http, $q, $location, breezeFactory);

            $scope.vm = this;

            this.toolbar.title = "All Models";
            this.toolbar.summary = "View all models";
        }

        //#endregion

        //#region Private Methods
        //#endregion

        //#region Public Methods

        public getQuery(): breeze.EntityQuery
        {
            var containsOperator = "Contains";

            var predicate = breeze.Predicate.create("Name", containsOperator, this.query)
                .or("concat(concat(Brand.Company.Name, '' ''), concat(concat(Brand.Name,'' ''), Name))", containsOperator, this.query);
            var query = new breeze.EntityQuery()
                .from("Models")
                .expand("Brand")
                .expand("Brand.Company")
                .where(predicate)
                .orderBy("Brand.Company.Name")
                .orderBy("Brand.Name")
                .orderBy("Name")
                .skip(this._navigationQuery.skip)
                .inlineCount(this._navigationQuery.includeCount);

            return query;
        }

        public newEntity(): void
        {
            this.$location.url(Models.Model.newUrl);
        }

        //#endregion
    }

    class ModelsRouteConfigurator
    {
        public static $inject = ['$routeProvider'];

        public constructor($routeProvider: ng.route.IRouteProvider)
        {
            // Models List
            $routeProvider.when(Models.Model.listUrl, {
                templateUrl: "/App/Models",
                controller: "ModelsViewModel"
            });
        }
    }

    class ModelsSidebarConfigurator
    {
        public static $inject = [Services.SidebarProvider.serviceId + "Provider"];

        public constructor(SidebarProvider: Services.ISidebarProvider)
        {
            SidebarProvider.addItem({
                title: "Models",
                url: Models.Model.listUrl,
                icon: "smartphone",
                order: 7,
                subCommands: [{
                    title: "Add New Model",
                    url: Models.Model.newUrl,
                    icon: "add",
                    order: 0
                }]
            });
        }
    }

    // Init
    angular.module(Config.appName)
        .controller(ModelsViewModel.controllerId, ModelsViewModel)
        .config(ModelsRouteConfigurator)
        .config(ModelsSidebarConfigurator);
}