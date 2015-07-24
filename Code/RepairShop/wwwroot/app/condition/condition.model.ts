module App.Models
{
    export interface ICondition
    {
        ConditionId: string;
        Name: string;
    }

    export class Condition extends BaseModel implements ICondition
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static get cacheListName(): string { return "conditionsLookup"; }
        public static get editUrl(): string { return "/" + Condition.urlNamespace + "/:" + Condition.lookupProperty + "/edit"; }
        public static get listUrl(): string { return "/" + Condition.urlNamespace; }
        public static get lookupProperty(): string { return "ConditionId"; }
        public static get urlNamespace(): string { return "conditions"; }
        public static get newUrl(): string { return "/" + Condition.urlNamespace + "/new"; }
        public static get viewUrl(): string { return "/" + Condition.urlNamespace + "/:" + Condition.lookupProperty; }

        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties

        //#region Table Properties

        public ConditionId: string;
        public Name: string;

        //#endregion

        public get editUrl(): string { return Condition.editUrl.replace(":" + Condition.lookupProperty, this.lookupValue); }
        public get lookupValue(): any { return this.ConditionId; }
        public get viewUrl(): string { return Condition.viewUrl.replace(":" + Condition.lookupProperty, this.lookupValue); }

        //#endregion

        //#region Constructors
        //#endregion

        //#region Public Static Methods

        public static getWipKey(...keys: any[]): string
        {
            let prefix = "ConditionWipKey_";

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
        //#endregion
    }
}