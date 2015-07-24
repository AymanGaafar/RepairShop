module App.Models
{
    export interface IJob
    {
        JobId: string;
        Code: string;
        ClientId: string;
        WorkDoneById: string;
        ModelId: string;
        IMEINumber: number;
        ConditionId: string;
        PhoneSeenWorking: boolean;
        BatteryWithPhone: boolean;
        HasWarranty: boolean;
        Notes: string;
        RecievedOn: Date;
        RepairedOn: Date;
        Fee: number;

        Client: Client;
        Condition: Condition;
        JobRepairReasons: JobRepairReason[];
        JobWorkDone: JobWorkDone[];
        Model: Model;
        RepairReasons: RepairReason[];
        WorkDone: WorkDone[];
        WorkDoneBy: User;

        TempRepairReasons: Array<string>;
        TempWorkDone: Array<string>;
    }

    export class Job extends BaseModel implements IJob
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static get cacheListName(): string { return "jobsLookup"; }
        public static get editUrl(): string { return "/" + Job.urlNamespace + "/:" + Job.lookupProperty + "/edit"; }
        public static get listUrl(): string { return "/" + Job.urlNamespace; }
        public static get lookupProperty(): string { return "Code"; }
        public static get urlNamespace(): string { return "jobs"; }
        public static get newUrl(): string { return "/" + Job.urlNamespace + "/new"; }
        public static get viewUrl(): string { return "/" + Job.urlNamespace + "/:" + Job.lookupProperty; }

        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties

        //#region Table Properties

        public JobId: string;
        public Code: string;
        public ClientId: string;
        public WorkDoneById: string;
        public ModelId: string;
        public IMEINumber: number;
        public ConditionId: string;
        public PhoneSeenWorking: boolean;
        public BatteryWithPhone: boolean;
        public HasWarranty: boolean;
        public Notes: string;
        public RecievedOn: Date;
        public RepairedOn: Date;
        public Fee: number;

        public Client: Client;
        public Condition: Condition;
        public JobRepairReasons: JobRepairReason[];
        public JobWorkDone: JobWorkDone[];
        public Model: Model;
        public RepairReasons: RepairReason[];
        public WorkDone: WorkDone[];
        public WorkDoneBy: User;

        public TempRepairReasons: Array<string> = [];
        public TempWorkDone: Array<string> = [];

        //#endregion

        public get editUrl(): string { return Job.editUrl.replace(":" + Job.lookupProperty, this.lookupValue); }
        public get lookupValue(): any { return this.Code; }
        public get viewUrl(): string { return Job.viewUrl.replace(":" + Job.lookupProperty, this.lookupValue); }
        
        //#endregion

        //#region Constructors
        //#endregion

        //#region Public Static Methods

        public static getWipKey(...keys: any[]): string
        {
            let prefix = "JobWipKey_";

            if (keys && keys.length > 0)
            {
                return prefix + keys.join("_");
            }
            
            return prefix + "New";
        }

        //#endregion

        //#region Private Methods
        //#endregion

        //#region Public Methods

        public toString(): string
        {
            return this.Code;
        }

        //#endregion
    }
}