module App.Models
{
    export interface IWorkDone
    {
        WorkDoneId: string;
        Title: string;
        Description: string;

        Jobs: Job[];
    }

    export class WorkDone extends BaseModel implements IWorkDone
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static get cacheListName(): string { return "workDoneLookup"; }
        public static get editUrl(): string { return "/" + WorkDone.urlNamespace + "/:" + WorkDone.lookupProperty + "/edit"; }
        public static get listUrl(): string { return "/" + WorkDone.urlNamespace; }
        public static get lookupProperty(): string { return "WorkDoneId"; }
        public static get urlNamespace(): string { return "work-done"; }
        public static get newUrl(): string { return "/" + WorkDone.urlNamespace + "/new"; }
        public static get viewUrl(): string { return "/" + WorkDone.urlNamespace + "/:" + WorkDone.lookupProperty; }

        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties

        //#region Table Properties

        public WorkDoneId: string;
        public Title: string;
        public Description: string;

        public Jobs: Job[];

        //#endregion

        public get editUrl(): string { return WorkDone.editUrl.replace(":" + WorkDone.lookupProperty, this.lookupValue); }
        public get lookupValue(): any { return this.WorkDoneId; }
        public get viewUrl(): string { return WorkDone.viewUrl.replace(":" + WorkDone.lookupProperty, this.lookupValue); }
        
        //#endregion

        //#region Constructors
        //#endregion

        //#region Public Static Methods

        public static getWipKey(...keys: any[]): string
        {
            let prefix = "WorkDoneWipKey_";

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
            return this.WorkDoneId;
        }

        //#endregion
    }
}