module App.ViewModels
{
    export class RepairReasonFormViewModel extends FormBaseViewModel <Models.RepairReason>
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static $inject = FormBaseViewModel.$inject.concat(["$scope"]);
        public static get controllerId(): string { return "RepairReasonFormViewModel"; }

        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties
        //#endregion

        //#region Constructors

        constructor($http, $q, $location, $route, $routeParams, zStorageWip, breezeFactory,
            private $scope: IFormBaseScope<RepairReasonFormViewModel>)
        {
            super($http,
                $q,
                $location,
                $route,
                $routeParams,
                zStorageWip,
                breezeFactory,
                breezeFactory.entityManager.metadataStore.getEntityType("RepairReason"),
                Models.RepairReason.newUrl,
                Models.RepairReason.listUrl,
                { RepairReasonId: breeze.core.getUuid() });

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
                query = new breeze.EntityQuery()
                    .from("RepairReasons")
                    .where(new breeze.Predicate(Models.RepairReason.lookupProperty, "eq", this.$routeParams[Models.RepairReason.lookupProperty]));
            }

            return query;
        }

        protected getWipKey(): string
        {
            if (!this.isNew)
            {
                return Models.RepairReason.getWipKey(this.$routeParams[Models.RepairReason.lookupProperty]);
            }

            return Models.RepairReason.getWipKey();
        }

        //#endregion

        //#region Public Methods
        //#endregion
    }

    class RepairReasonFormRouteConfigurator
    {
        public static $inject = ['$routeProvider'];

        public constructor($routeProvider: ng.route.IRouteProvider)
        {
            // New RepairReason
            $routeProvider.when(Models.RepairReason.newUrl, {
                templateUrl: "/App/RepairReasonForm",
                controller: "RepairReasonFormViewModel"
            });
            
            // Edit RepairReason
            $routeProvider.when(Models.RepairReason.editUrl, {
                templateUrl: "/App/RepairReasonForm",
                controller: "RepairReasonFormViewModel"
            });
        }
    }

    // Init
    angular.module(Config.appName)
        .controller(RepairReasonFormViewModel.controllerId, RepairReasonFormViewModel)
        .config(RepairReasonFormRouteConfigurator);
}