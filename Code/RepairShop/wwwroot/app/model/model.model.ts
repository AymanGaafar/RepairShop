module App.Models
{
    export interface IModel
    {
        ModelId: string;
        BrandId: string;
        Name: string;
        HelpLink: string;

        Brand: Brand;
        Jobs: Job[];
    }

    export class Model extends BaseModel implements IModel
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static get cacheListName(): string { return "modelsLookup"; }
        public static get editUrl(): string { return "/" + Model.urlNamespace + "/:" + Model.lookupProperty + "/edit"; }
        public static get listUrl(): string { return "/" + Model.urlNamespace; }
        public static get lookupProperty(): string { return "ModelId"; }
        public static get urlNamespace(): string { return "models"; }
        public static get newUrl(): string { return "/" + Model.urlNamespace + "/new"; }
        public static get viewUrl(): string { return "/" + Model.urlNamespace + "/:" + Model.lookupProperty; }

        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties

        //#region Table Properties

        public ModelId: string;
        public BrandId: string;
        public Name: string;
        public HelpLink: string;

        public Brand: Brand;
        public Jobs: Job[];

        //#endregion

        public get editUrl(): string { return Model.editUrl.replace(":" + Model.lookupProperty, this.lookupValue); }
        public get fullName(): string
        {
            var companyName = "";
            var brandName = "";

            if (this.Brand)
            {
                brandName = this.Brand.Name || "";

                if (this.Brand.Company)
                {
                    companyName = this.Brand.Company.Name || "";
                }
            }

            return [companyName, brandName, this.Name].join(" ");
        }
        public get lookupValue(): any { return this.ModelId; }
        public get viewUrl(): string { return Model.viewUrl.replace(":" + Model.lookupProperty, this.lookupValue); }

        //#endregion

        //#region Constructors
        //#endregion

        //#region Public Static Methods

        public static getWipKey(...keys: any[]): string
        {
            let prefix = "ModelWipKey_";

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