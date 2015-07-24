module App.Models
{
    export interface ICompany
    {
        CompanyId: string;
        Name: string;

        Brands: Brand[];
    }

    export class Company extends BaseModel implements ICompany
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static get cacheListName(): string { return "companiesLookup"; }
        public static get editUrl(): string { return "/" + Company.urlNamespace + "/:" + Company.lookupProperty + "/edit"; }
        public static get listUrl(): string { return "/" + Company.urlNamespace; }
        public static get lookupProperty(): string { return "CompanyId"; }
        public static get urlNamespace(): string { return "companies"; }
        public static get newUrl(): string { return "/" + Company.urlNamespace + "/new"; }
        public static get viewUrl(): string { return "/" + Company.urlNamespace + "/:" + Company.lookupProperty; }

        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties

        //#region Table Properties

        public CompanyId: string;
        public Name: string;

        public Brands: Brand[];

        //#endregion

        public get editUrl(): string { return Company.editUrl.replace(":" + Company.lookupProperty, this.lookupValue); }
        public get lookupValue(): any { return this.CompanyId; }
        public get viewUrl(): string { return Company.viewUrl.replace(":" + Company.lookupProperty, this.lookupValue); }

        //#endregion

        //#region Constructors
        //#endregion

        //#region Public Static Methods

        public static getWipKey(...keys: any[]): string
        {
            let prefix = "CompanyWipKey_";

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