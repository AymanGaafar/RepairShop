module App.ViewModels
{
    export class AppViewModel extends BaseViewModel
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static $inject = ['$scope', '$rootScope', '$q', '$http', '$route'];
        public static controllerId: string = "AppViewModel";
        
        //#endregion

        //#region Private Properties

        private _defaultToolbar = {
            actions: [],
            backColor: "",
            color: "white",
            summary: "",
            title: Config.title
        };

        //#endregion

        //#region Public Properties

        public get status(): UIComponents.IStatusReporter { return this._status; }
        public get toolbar(): Helpers.IToolbar
        {
            return this.$route.current
                && this.$route.current.scope
                && this.$route.current.scope.vm
                && this.$route.current.scope.vm.toolbar
                ? this.$route.current.scope.vm.toolbar : this._defaultToolbar;
        }

        //#endregion

        //#region Constructors

        constructor(private $scope: IBaseScope<AppViewModel>,
            private $rootScope: ng.IRootScopeService,
            private $q: ng.IQService,
            private $http: ng.IHttpService,
            private $route: any)
        {
            super();

            $scope.vm = this;

            // Very important to register angular q and http services
            //App.registerQ($q);
            //App.registerHttp($http);

            // Route listeners
            $rootScope.$on('$routeChangeStart', (event, newUrl, oldUrl) =>
            {
                this.locationChangeStart(event, newUrl);
            });

            $rootScope.$on('$routeChangeSuccess', (event, newUrl, oldUrl) =>
            {
                this.locationChangeSuccess(event, newUrl);
            });
        }

        //#endregion

        //#region Private Methods
        
        private locationChangeStart(event: ng.IAngularEvent, newUrl: string): void
        {
            this.status.isBusy = true;
            this.status.title = "Loading Template";
        }

        private locationChangeSuccess(event: ng.IAngularEvent, newUrl: string): void
        {
            this.status.isBusy = false;
            this.status.title = "";
        }
        
        //#endregion

        //#region Public Methods

        public isCurrentRoute(route: string): boolean
        {
            return false;
        }
        
        //#endregion
    }

    class AppSidebarConfigurator
    {
        public static $inject = [Services.SidebarProvider.serviceId + "Provider"];

        public constructor(SidebarProvider: Services.ISidebarProvider)
        {
            SidebarProvider.addItem({
                title: "Home",
                url: "/",
                icon: "home",
                order: 0
            });
        }
    }

    // Init
    angular.module(Config.appName)
        .controller(AppViewModel.controllerId, AppViewModel)
        .config(AppSidebarConfigurator);
}