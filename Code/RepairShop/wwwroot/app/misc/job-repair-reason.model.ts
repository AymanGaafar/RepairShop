module App.Models
{
    export interface IJobRepairReason
    {
        JobId: string;
        RepairReasonId: string;
    }

    export class JobRepairReason extends BaseModel implements IJobRepairReason
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties
        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties

        public get editUrl(): string { return ""; }
        public get lookupValue(): any { return ""; }
        public get viewUrl(): string { return ""; }

        public JobId: string;
        public RepairReasonId: string;

        //#endregion

        //#region Constructors
        //#endregion

        //#region Private Methods
        //#endregion

        //#region Public Methods
        //#endregion
    }
}