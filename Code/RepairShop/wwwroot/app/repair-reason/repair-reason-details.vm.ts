module App.ViewModels
{
    export class RepairReasonDetailsViewModel extends DetailsBaseViewModel <Models.RepairReason>
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static $inject = DetailsBaseViewModel.$inject.concat(["$scope"]);
        static get controllerId(): string { return "RepairReasonDetailsViewModel"; }

        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties
        //#endregion

        //#region Constructors

        public constructor($http, $q, $location, $routeParams, breezeFactory,
            private $scope: IDetailsBaseScope<RepairReasonDetailsViewModel>)
        {
            super($http, $q, $location, $routeParams, breezeFactory);

            $scope.vm = this;

            this.toolbar.title = "Repair Reason Details";
        }

        //#endregion

        //#region Private Methods
        //#endregion
        
        //#region Protected Methods

        protected getQuery(): breeze.EntityQuery
        {
            var query = new breeze.EntityQuery()
                .from("RepairReasons")
                .expand(["JobRepairReasons", "JobRepairReasons.Job", "JobRepairReasons.Job.Client"])
                .where(new breeze.Predicate(Models.RepairReason.lookupProperty, "eq", this.$routeParams[Models.RepairReason.lookupProperty]));

            return query;
        }

        //#endregion

        //#region Public Methods

        public delete(): void
        {
            super.delete(Models.RepairReason.listUrl);
        }

        //#endregion
    }

    class RepairReasonDetailsRouteConfigurator
    {
        public static $inject = ['$routeProvider'];

        public constructor($routeProvider: ng.route.IRouteProvider)
        {
            // RepairReason Details
            $routeProvider.when(Models.RepairReason.viewUrl, {
                templateUrl: "/App/RepairReasonDetails",
                controller: "RepairReasonDetailsViewModel"
            });
        }
    }

    // Init
    angular.module(Config.appName)
        .controller(RepairReasonDetailsViewModel.controllerId, RepairReasonDetailsViewModel)
        .config(RepairReasonDetailsRouteConfigurator);
}