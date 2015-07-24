module App.ViewModels
{
    export class UserFormViewModel extends FormBaseViewModel <Models.User>
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static $inject = FormBaseViewModel.$inject.concat(["$scope"]);
        public static get controllerId(): string { return "UserFormViewModel"; }

        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties
        //#endregion

        //#region Constructors

        constructor($http, $q, $location, $route, $routeParams, zStorageWip, breezeFactory,
            private $scope: IFormBaseScope<UserFormViewModel>)
        {
            super($http,
                $q,
                $location,
                $route,
                $routeParams,
                zStorageWip,
                breezeFactory,
                breezeFactory.entityManager.metadataStore.getEntityType("User"),
                Models.User.newUrl,
                Models.User.listUrl,
                { Id: breeze.core.getUuid() });

            $scope.vm = this;
        }

        //#endregion

        //#region Private Methods
        //#endregion

        //#region Protected Methods

        protected getQuery(): breeze.EntityQuery
        {
            let query = null;

            if (!this.isNew)
            {
                query = new breeze.EntityQuery().from("Users")
                    .where(new breeze.Predicate(Models.User.lookupProperty, "eq", this.$routeParams[Models.User.lookupProperty]));
            }

            return query;
        }

        protected getWipKey(): string
        {
            if (!this.isNew)
            {
                return Models.User.getWipKey(this.$routeParams[Models.User.lookupProperty]);
            }

            return Models.User.getWipKey();
        }

        //#endregion

        //#region Public Methods
        //#endregion
    }

    class UserFormRouteConfigurator
    {
        public static $inject = ['$routeProvider'];

        public constructor($routeProvider: ng.route.IRouteProvider)
        {
            // New User
            $routeProvider.when(Models.User.newUrl, {
                templateUrl: "/App/UserForm",
                controller: "UserFormViewModel"
            });
            
            // Edit User
            $routeProvider.when(Models.User.editUrl, {
                templateUrl: "/App/UserForm",
                controller: "UserFormViewModel"
            });
        }
    }

    // Init
    angular.module(Config.appName)
        .controller(UserFormViewModel.controllerId, UserFormViewModel)
        .config(UserFormRouteConfigurator);
}