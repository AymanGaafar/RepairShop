module App.Models
{
    export interface IJobWorkDone
    {
        JobId: string;
        WorkDoneId: string;
    }

    export class JobWorkDone extends BaseModel implements IJobWorkDone
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
        public WorkDoneId: string;

        //#endregion

        //#region Constructors
        //#endregion

        //#region Private Methods
        //#endregion

        //#region Public Methods
        //#endregion
    }
}