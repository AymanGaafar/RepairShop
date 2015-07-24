module App.Models
{
    export interface IBrand
    {
        BrandId: string;
        CompanyId: string;
        Name: string;

        Company: Company;
        Models: Model[];
    }

    export class Brand extends BaseModel implements IBrand
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties
        
        public static get cacheListName(): string { return "brandsLookup"; }
        public static get editUrl(): string { return "/" + Brand.urlNamespace + "/:" + Brand.lookupProperty + "/edit"; }
        public static get listUrl(): string { return "/" + Brand.urlNamespace; }
        public static get lookupProperty(): string { return "BrandId"; }
        public static get urlNamespace(): string { return "brands"; }
        public static get newUrl(): string { return "/" + Brand.urlNamespace + "/new"; }
        public static get viewUrl(): string { return "/" + Brand.urlNamespace + "/:" + Brand.lookupProperty; }

        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties

        //#region Table Properties

        public BrandId: string;
        public CompanyId: string;
        public Name: string;

        public Company: Company;
        public Models: Model[];

        //#endregion

        public get editUrl(): string { return Brand.editUrl.replace(":" + Brand.lookupProperty, this.lookupValue); }
        public get fullName(): string
        {
            var companyName = this.Company ? (this.Company.Name || "") : "";

            return [companyName, this.Name].join(" ");
        }
        public get lookupValue(): any { return this.BrandId; }
        public get viewUrl(): string { return Brand.viewUrl.replace(":" + Brand.lookupProperty, this.lookupValue); }

        //#endregion

        //#region Constructors
        //#endregion

        //#region Public Static Methods

        public static getWipKey(...keys: any[]): string
        {
            let prefix = "BrandWipKey_";

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