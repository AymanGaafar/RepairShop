module App.Models
{
    export interface IRepairReason
    {
        RepairReasonId: string;
        Title: string;
        Description: string;

        Jobs: Job[];
    }

    export class RepairReason extends BaseModel implements IRepairReason
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static get cacheListName(): string { return "repairReasonsLookup"; }
        public static get editUrl(): string { return "/" + RepairReason.urlNamespace + "/:" + RepairReason.lookupProperty + "/edit"; }
        public static get listUrl(): string { return "/" + RepairReason.urlNamespace; }
        public static get lookupProperty(): string { return "RepairReasonId"; }
        public static get urlNamespace(): string { return "repair-reasons"; }
        public static get newUrl(): string { return "/" + RepairReason.urlNamespace + "/new"; }
        public static get viewUrl(): string { return "/" + RepairReason.urlNamespace + "/:" + RepairReason.lookupProperty; }

        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties

        //#region Table Properties

        public RepairReasonId: string;
        public Title: string;
        public Description: string;

        public Jobs: Job[];

        //#endregion

        public get editUrl(): string { return RepairReason.editUrl.replace(":" + RepairReason.lookupProperty, this.lookupValue); }
        public get lookupValue(): any { return this.RepairReasonId; }
        public get viewUrl(): string { return RepairReason.viewUrl.replace(":" + RepairReason.lookupProperty, this.lookupValue); }
        
        //#endregion

        //#region Constructors
        //#endregion

        //#region Public Static Methods

        public static getWipKey(...keys: any[]): string
        {
            let prefix = "RepairReasonWipKey_";

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
            return this.RepairReasonId;
        }

        //#endregion
    }
}