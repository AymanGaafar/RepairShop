module App.ViewModels
{
    export class UserDetailsViewModel extends DetailsBaseViewModel<Models.User>
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static $inject = DetailsBaseViewModel.$inject.concat(["$scope"]);
        static get controllerId(): string { return "UserDetailsViewModel"; }

        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties
        //#endregion

        //#region Constructors

        public constructor($http, $q, $location, $routeParams, breezeFactory,
            private $scope: IDetailsBaseScope<UserDetailsViewModel>)
        {
            super($http, $q, $location, $routeParams, breezeFactory);

            $scope.vm = this;

            this.toolbar.title = "User Details";
        }

        //#endregion

        //#region Private Methods
        //#endregion

        //#region Protected Methods

        protected getQuery(): breeze.EntityQuery
        {
            var query = new breeze.EntityQuery()
                .from("Users")
                .expand(["Jobs", "Jobs.Client"])
                .where(new breeze.Predicate(Models.User.lookupProperty, "eq", this.$routeParams[Models.User.lookupProperty]));

            return query;
        }

        //#endregion

        //#region Public Methods

        public delete(): void
        {
            super.delete(Models.User.listUrl);
        }

        //#endregion
    }

    class UserDetailsRouteConfigurator
    {
        public static $inject = ['$routeProvider'];

        public constructor($routeProvider: ng.route.IRouteProvider)
        {
            // User Details
            $routeProvider.when(Models.User.viewUrl, {
                templateUrl: "/App/UserDetails",
                controller: "UserDetailsViewModel"
            });
        }
    }

    // Init
    angular.module(Config.appName)
        .controller(UserDetailsViewModel.controllerId, UserDetailsViewModel)
        .config(UserDetailsRouteConfigurator);
}