module App.ViewModels
{
    class SidebarViewModel extends BaseViewModel
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static get controllerId(): string { return "SidebarViewModel"; }
        
        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties
        
        public get items(): Services.ISidebarItem[] { return this.SidebarProvider.items; }
        public get signedInUser(): Models.User { return this.signedInUserFactory.user; }

        //#endregion

        //#region Constructors

        constructor(private $scope: IBaseScope<SidebarViewModel>, private $http: ng.IHttpService,
            private SidebarProvider: Services.ISidebarProvider, private signedInUserFactory: Services.ISignedInUserService)
        {
            super();

            $scope.vm = this;
        }

        //#endregion

        //#region Private Methods
        //#endregion

        //#region Public Methods
        //#endregion
    }

    // Init
    angular.module(Config.appName)
        .controller(SidebarViewModel.controllerId, [
        '$scope', '$http', Services.SidebarProvider.serviceId, Services.SignedInUserService.serviceId,
        ($scope, $http, SidebarProvider, signedInUserFactory) =>
            new SidebarViewModel($scope, $http, SidebarProvider, signedInUserFactory)
    ]);
}