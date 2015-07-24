module App.Services
{
    export interface ISignedInUserService
    {
        user: Models.User;

        signout: () => void;
    }

    export class SignedInUserService implements ISignedInUserService
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static $inject = ["$rootScope", "$http", Services.BreezeService.serviceId];
        public static get serviceId(): string { return "signedInUser"; }
        
        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties

        public user: Models.User;

        //#endregion

        //#region Constructors
        
        constructor(private $rootScope: ng.IRootScopeService, private $http: ng.IHttpService,
            private breezeFactory: Services.BreezeService)
        {
            this.refresh(false);
        }

        //#endregion

        //#region Private Methods
        //#endregion

        //#region Public Methods

        public refresh(fromCache: boolean): void
        {
            var api = "/api/Account/SignedInUser";

            this.$http.get(api)
                .success((response: Helpers.IResult<Models.IUser>) =>
                {
                    this.user = Models.User.createFromObject(response.Data);

                    if (this.user == null)
                    {
                        this.signout();
                    }
                })
                .catch((reason) =>
                {
                    console.error(reason);
                    console.error("Could not retrieve signed in user");

                    //this.signout();
                });

            //var entityManager = this.breezeFactory.entityManager;
            //var query = new breeze.EntityQuery().from("SignedInUser");
            
            //entityManager.executeQuery(query).then((data) =>
            //{
            //    this.user = <Models.User> data.retrievedEntities[0];

            //    if (this.user == null)
            //    {
            //        localStorage.removeItem("tokenKey");

            //        document.location.href = "/login";
            //    }
            //},(reason) =>
            //{
            //    console.error(reason);
            //});
        }

        signout(): void
        {
            localStorage.removeItem("tokenKey");

            //document.location.href = "/login";
        }

        //#endregion
    }

    // Init
    angular.module(Config.appName)
        .service(SignedInUserService.serviceId, SignedInUserService);
}