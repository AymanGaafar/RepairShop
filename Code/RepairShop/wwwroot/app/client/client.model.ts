module App.Models
{
    export interface IClient
    {
        ClientId: string;
        Code: string;
        FirstName: string;
        LastName: string;
        RegistrationDate: Date;

        Address: Address;
        ContactInfo: ContactInfo;
        Jobs: Job[];
    }

    export class Client extends BaseModel implements IClient
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static get cacheListName(): string { return "clientsLookup"; }
        public static get editUrl(): string { return "/" + Client.urlNamespace + "/:" + Client.lookupProperty + "/edit"; }
        public static get listUrl(): string { return "/" + Client.urlNamespace; }
        public static get lookupProperty(): string { return "Code"; }
        public static get urlNamespace(): string { return "clients"; }
        public static get newUrl(): string { return "/" + Client.urlNamespace + "/new"; }
        public static get viewUrl(): string { return "/" + Client.urlNamespace + "/:" + Client.lookupProperty; }

        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties

        //#region Table Properties

        public ClientId: string;
        public Code: string;
        public FirstName: string;
        public LastName: string;
        public RegistrationDate: Date;

        public Address: Address;
        public ContactInfo: ContactInfo;
        public Jobs: Job[];

        //#endregion

        /**
         * Gets the first and last names to produce a displayable name of the user.
         *
         * @returns {string} The display name of the user.
         */
        public get displayName(): string { return [this.FirstName || "", this.LastName || ""].join(" "); }
        public get editUrl(): string { return Client.editUrl.replace(":" + Client.lookupProperty, this.lookupValue); }
        public get lookupValue(): any { return this.Code; }
        public get viewUrl(): string { return Client.viewUrl.replace(":" + Client.lookupProperty, this.lookupValue); }

        //#endregion

        //#region Constructors
        //#endregion

        //#region Public Static Methods

        public static getWipKey(...keys: any[]): string
        {
            let prefix = "ClientWipKey_";

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