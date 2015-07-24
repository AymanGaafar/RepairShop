module App.ViewModels
{
    export class UsersViewModel extends ListBaseViewModel<Models.User>
    {
        //#region Private Static Properties        
        //#endregion

        //#region Public Static Properties

        public static $inject = ListBaseViewModel.$inject.concat(["$scope"]);
        public static get controllerId(): string { return "UsersViewModel"; }
        
        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties
        //#endregion

        //#region Constructors

        public constructor($http, $q, $location, breezeFactory,
            private $scope: IListBaseScope<UsersViewModel>)
        {
            super($http, $q, $location, breezeFactory);

            $scope.vm = this;

            this.toolbar.title = "All Users";
            this.toolbar.summary = "View all users";
        }

        //#endregion

        //#region Private Methods        
        //#endregion

        //#region Public Methods

        public getQuery(): breeze.EntityQuery
        {
            var containsOperator = "Contains";

            var predicate = breeze.Predicate.create("UserName", containsOperator, this.query)
                .or("concat(concat(FirstName,'' ''), LastName)", containsOperator, this.query)
                .or("FirstName", containsOperator, this.query)
                .or("LastName", containsOperator, this.query)
                .or("Email", containsOperator, this.query);
            var query = new breeze.EntityQuery()
                .from("Users")
                .where(predicate)
                .orderBy("FirstName")
                .orderBy("LastName")
                .skip(this._navigationQuery.skip)
                .inlineCount(this._navigationQuery.includeCount);

            return query;
        }

        public newEntity(): void
        {
            this.$location.url(Models.User.newUrl);
        }

        //#endregion
    }

    class UsersRouteConfigurator
    {
        public static $inject = ['$routeProvider'];

        public constructor($routeProvider: ng.route.IRouteProvider)
        {
            // Users List
            $routeProvider.when(Models.User.listUrl, {
                templateUrl: "App/Users",
                controller: "UsersViewModel"
            });
        }
    }

    class UsersSidebarConfigurator
    {
        public static $inject = [Services.SidebarProvider.serviceId + "Provider"];

        public constructor(SidebarProvider: Services.ISidebarProvider)
        {
            SidebarProvider.addItem({
                title: "Users",
                url: Models.User.listUrl,
                //iconClass: "assignment-ind",
                icon: "people",
                order: 3,
                subCommands: [{
                    title: "Add New User",
                    url: Models.User.newUrl,
                    icon: "add",
                    order: 0
                }]
            });
        }
    }

    // Init
    angular.module(Config.appName)
        .controller(UsersViewModel.controllerId, UsersViewModel)
        .config(UsersRouteConfigurator)
        .config(UsersSidebarConfigurator);
}