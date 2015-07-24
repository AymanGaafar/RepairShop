module App.Models
{
    export interface IUser
    {
        Id: string;
        UserName: string;
        FirstName: string;
        LastName: string;
        IdNumber: string;
        BirthDate: Date;
        Email: string;

        Address: Address;
        ContactInfo: ContactInfo;
        Jobs: Job[];
    }

    export class User extends BaseModel implements IUser
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static get cacheListName(): string { return "usersLookup"; }
        public static get editUrl(): string { return "/" + User.urlNamespace + "/:" + User.lookupProperty + "/edit"; }
        public static get listUrl(): string { return "/" + User.urlNamespace; }
        public static get lookupProperty(): string { return "UserName"; }
        public static get urlNamespace(): string { return "users"; }
        public static get newUrl(): string { return "/" + User.urlNamespace + "/new"; }
        public static get viewUrl(): string { return "/" + User.urlNamespace + "/:" + User.lookupProperty; }

        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties

        //#region Table Properties

        public Id: string;
        public UserName: string;
        public FirstName: string;
        public LastName: string;
        public IdNumber: string;
        public BirthDate: Date;
        public Email: string;

        public Address: Address;
        public ContactInfo: ContactInfo;
        public Jobs: Job[];

        //#endregion

        /**
         * Combines the first and last names to produce a displayable name of the user.
         *
         * @returns {string} The display name of the user.
         */
        public get displayName(): string { return [this.FirstName || "", this.LastName || ""].join(" "); }
        public get editUrl(): string { return User.editUrl.replace(":" + User.lookupProperty, this.lookupValue); }
        public get lookupValue(): any { return this.UserName; }
        public get viewUrl(): string { return User.viewUrl.replace(":" + User.lookupProperty, this.lookupValue); }

        //#endregion

        //#region Constructors
        //#endregion

        //#region Public Static Methods

        public static createFromObject(obj: IUser): User
        {
            var user = new User();

            angular.extend(user, obj);

            return user;
        }

        public static getWipKey(...keys: any[]): string
        {
            let prefix = "UserWipKey_";

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
            return this.displayName;
        }

        //#endregion
    }
}