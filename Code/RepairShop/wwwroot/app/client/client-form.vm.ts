module App.ViewModels
{
    export class ClientFormViewModel extends FormBaseViewModel<Models.Client>
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static $inject = FormBaseViewModel.$inject.concat(["$scope"]);
        public static get controllerId(): string { return "ClientFormViewModel"; }

        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties
        //#endregion

        //#region Constructors

        constructor($http, $q, $location, $route, $routeParams, zStorageWip, breezeFactory,
            private $scope: IFormBaseScope<ClientFormViewModel>)
        {
            super($http,
                $q,
                $location,
                $route,
                $routeParams,
                zStorageWip,
                breezeFactory,
                breezeFactory.entityManager.metadataStore.getEntityType("Client"),
                Models.Client.newUrl,
                Models.Client.listUrl,
                { ClientId: breeze.core.getUuid() });

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
                query = new breeze.EntityQuery().from("Clients")
                    .where(new breeze.Predicate(Models.Client.lookupProperty, "eq", this.$routeParams[Models.Client.lookupProperty]));
            }

            return query;
        }

        protected getWipKey(): string
        {
            if (!this.isNew)
            {
                return Models.Client.getWipKey(this.$routeParams[Models.Client.lookupProperty]);
            }

            return Models.Client.getWipKey();
        }

        //#endregion

        //#region Public Methods
        //#endregion
    }

    class ClientFormRouteConfigurator
    {
        public static $inject = ['$routeProvider'];

        public constructor($routeProvider: ng.route.IRouteProvider)
        {
            // New Client
            $routeProvider.when(Models.Client.newUrl, {
                templateUrl: "/App/ClientForm",
                controller: "ClientFormViewModel"
            });
            
            // Edit Client
            $routeProvider.when(Models.Client.editUrl, {
                templateUrl: "/App/ClientForm",
                controller: "ClientFormViewModel"
            });
        }
    }

    // Init
    angular.module(Config.appName)
        .controller(ClientFormViewModel.controllerId, ClientFormViewModel)
        .config(ClientFormRouteConfigurator);
}