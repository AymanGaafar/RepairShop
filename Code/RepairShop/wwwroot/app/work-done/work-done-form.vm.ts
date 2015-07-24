module App.ViewModels
{
    export class WorkDoneFormViewModel extends FormBaseViewModel <Models.WorkDone>
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static $inject = FormBaseViewModel.$inject.concat(["$scope"]);
        public static get controllerId(): string { return "WorkDoneFormViewModel"; }

        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties
        //#endregion

        //#region Constructors

        constructor($http, $q, $location, $route, $routeParams, zStorageWip, breezeFactory,
            private $scope: IFormBaseScope<WorkDoneFormViewModel>)
        {
            super($http,
                $q,
                $location,
                $route,
                $routeParams,
                zStorageWip,
                breezeFactory,
                breezeFactory.entityManager.metadataStore.getEntityType("WorkDone"),
                Models.WorkDone.newUrl,
                Models.WorkDone.listUrl,
                { WorkDoneId: breeze.core.getUuid() });

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
                    .from("WorkDone")
                    .where(new breeze.Predicate(Models.WorkDone.lookupProperty, "eq", this.$routeParams[Models.WorkDone.lookupProperty]));
            }

            return query;
        }

        protected getWipKey(): string
        {
            if (!this.isNew)
            {
                return Models.WorkDone.getWipKey(this.$routeParams[Models.WorkDone.lookupProperty]);
            }

            return Models.WorkDone.getWipKey();
        }

        //#endregion

        //#region Public Methods
        //#endregion
    }

    class WorkDoneFormRouteConfigurator
    {
        public static $inject = ['$routeProvider'];

        public constructor($routeProvider: ng.route.IRouteProvider)
        {
            // New WorkDone
            $routeProvider.when(Models.WorkDone.newUrl, {
                templateUrl: "/App/WorkDoneForm",
                controller: "WorkDoneFormViewModel"
            });
            
            // Edit WorkDone
            $routeProvider.when(Models.WorkDone.editUrl, {
                templateUrl: "/App/WorkDoneForm",
                controller: "WorkDoneFormViewModel"
            });
        }
    }

    // Init
    angular.module(Config.appName)
        .controller(WorkDoneFormViewModel.controllerId, WorkDoneFormViewModel)
        .config(WorkDoneFormRouteConfigurator);
}