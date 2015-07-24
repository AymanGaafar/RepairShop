module App.ViewModels
{
    export class ConditionFormViewModel extends FormBaseViewModel <Models.Condition>
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static $inject = FormBaseViewModel.$inject.concat(["$scope"]);
        public static get controllerId(): string { return "ConditionFormViewModel"; }

        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties
        //#endregion

        //#region Constructors

        constructor($http, $q, $location, $route, $routeParams, zStorageWip, breezeFactory,
            private $scope: IFormBaseScope<ConditionFormViewModel>)
        {
            super($http,
                $q,
                $location,
                $route,
                $routeParams,
                zStorageWip,
                breezeFactory,
                breezeFactory.entityManager.metadataStore.getEntityType("Condition"),
                Models.Condition.newUrl,
                Models.Condition.listUrl,
                { ConditionId: breeze.core.getUuid() });

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
                    .from("Conditions")
                    .where(new breeze.Predicate(Models.Condition.lookupProperty, "eq", this.$routeParams[Models.Condition.lookupProperty]));
            }

            return query;
        }

        protected getWipKey(): string
        {
            if (!this.isNew)
            {
                return Models.Condition.getWipKey(this.$routeParams[Models.Condition.lookupProperty]);
            }

            return Models.Condition.getWipKey();
        }

        //#endregion

        //#region Public Methods
        //#endregion
    }

    class ConditionFormRouteConfigurator
    {
        public static $inject = ['$routeProvider'];

        public constructor($routeProvider: ng.route.IRouteProvider)
        {
            // New Condition
            $routeProvider.when(Models.Condition.newUrl, {
                templateUrl: "/App/ConditionForm",
                controller: "ConditionFormViewModel"
            });
            
            // Edit Condition
            $routeProvider.when(Models.Condition.editUrl, {
                templateUrl: "/App/ConditionForm",
                controller: "ConditionFormViewModel"
            });
        }
    }

    // Init
    angular.module(Config.appName)
        .controller(ConditionFormViewModel.controllerId, ConditionFormViewModel)
        .config(ConditionFormRouteConfigurator);
}