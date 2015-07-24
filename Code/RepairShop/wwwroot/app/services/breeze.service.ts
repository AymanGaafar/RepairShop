module App.Services
{
    export interface IBreezeService 
    {
        entityManager: breeze.EntityManager;
    }

    export class BreezeService implements IBreezeService 
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static $inject = ["$http", "breeze"];
        public static get serviceId() { return "breezeService"; }
        
        //#endregion

        //#region Private Properties

        private _entityManager: breeze.EntityManager;

        //#endregion

        //#region Public Properties

        public get entityManager(): breeze.EntityManager { return this._entityManager; }

        //#endregion

        //#region Constructors

        constructor(private $http: ng.IHttpService, private breezeService: any)
        {
            // define the Breeze `DataService` for this app
            var dataService = new breeze.DataService({
                adapterName: "odata",
                hasServerMetadata: false,  // don't ask the server for metadata 
                serviceName: "odata",
                uriBuilderName: "odata",
            });
 
            // create the metadataStore 
            var metadataStore = new breeze.MetadataStore();
 
            // initialize it from the application's metadata variable
            //metadataStore.importMetadata(Models.metaData);
            Models.buildMetadata(metadataStore);

            // Apply additional functions and properties to the models
            metadataStore.registerEntityTypeCtor("Brand", Models.Brand);
            metadataStore.registerEntityTypeCtor("Client", Models.Client);
            metadataStore.registerEntityTypeCtor("Company", Models.Company);
            metadataStore.registerEntityTypeCtor("Condition", Models.Condition);
            metadataStore.registerEntityTypeCtor("Job", Models.Job);
            metadataStore.registerEntityTypeCtor("JobRepairReason", Models.JobRepairReason);
            metadataStore.registerEntityTypeCtor("JobWorkDone", Models.JobWorkDone);
            metadataStore.registerEntityTypeCtor("Model", Models.Model);
            metadataStore.registerEntityTypeCtor("RepairReason", Models.RepairReason);
            metadataStore.registerEntityTypeCtor("User", Models.User);
            metadataStore.registerEntityTypeCtor("WorkDone", Models.WorkDone);
            
            // Initializes and store entity manager.
            var entityManager = this._entityManager = new breeze.EntityManager(
                { dataService: dataService, metadataStore: metadataStore }
                );

            //entityManager.fetchMetadata(() => { localStorage.setItem("breeze", entityManager.metadataStore.exportMetadata()); });
            //localStorage.setItem("breeze", entityManager.metadataStore.exportMetadata());
        }

        //#endregion

        //#region Private Methods
        //#endregion

        //#region Public Methods
        //#endregion
    }

    // Register the service
    angular.module(Config.appName)
        .service(BreezeService.serviceId, BreezeService);
}