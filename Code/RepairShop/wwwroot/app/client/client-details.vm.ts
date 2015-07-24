module App.ViewModels
{
    export class ClientDetailsViewModel extends DetailsBaseViewModel <Models.Client>
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static $inject = DetailsBaseViewModel.$inject.concat(["$scope"]);
        static get controllerId(): string { return "ClientDetailsViewModel"; }

        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties
        //#endregion

        //#region Constructors

        public constructor($http, $q, $location, $routeParams, breezeFactory,
            private $scope: IDetailsBaseScope<ClientDetailsViewModel>)
        {
            super($http, $q, $location, $routeParams, breezeFactory);

            $scope.vm = this;

            this.toolbar.title = "Client Details";
        }

        //#endregion

        //#region Private Methods
        //#endregion

        //#region Protected Methods

        protected getQuery(): breeze.EntityQuery
        {
            var query = new breeze.EntityQuery()
                .from("Clients")
                .where(new breeze.Predicate(Models.Client.lookupProperty, "eq", this.$routeParams[Models.Client.lookupProperty]))
                .expand(["Jobs"]);

            return query;
        }

        //#endregion

        //#region Public Methods

        public delete(): void
        {
            super.delete(Models.Client.listUrl);
        }

        //#endregion
    }

    class ClientDetailsRouteConfigurator
    {
        public static $inject = ['$routeProvider'];

        public constructor($routeProvider: ng.route.IRouteProvider)
        {
            // Client Details
            $routeProvider.when(Models.Client.viewUrl, {
                templateUrl: "/App/ClientDetails",
                controller: "ClientDetailsViewModel"
            });
        }
    }

    // Init
    angular.module(Config.appName)
        .controller(ClientDetailsViewModel.controllerId, ClientDetailsViewModel)
        .config(ClientDetailsRouteConfigurator);
}