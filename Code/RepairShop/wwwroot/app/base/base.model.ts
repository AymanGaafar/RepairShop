module App.Models
{
    export class BaseModel implements breeze.Entity
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties
        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties

        public entityAspect: breeze.EntityAspect;
        public entityType: breeze.EntityType;

        public get editUrl(): string { throw "Not Implemented"; }
        public get lookupValue(): any { throw "Not Implemented"; }
        public get viewUrl(): string { throw "Not Implemented"; }

        //#endregion

        //#region Constructors
        //#endregion

        //#region Public Static Methods

        public static getWipKey(...keys: any[]): string
        {
            throw "BaseModel.getWipKey: Not implemented.";
        }

        //#endregion

        //#region Private Methods
        //#endregion

        //#region Public Methods

        public toString(): string { return "Base Model"; }

        //#endregion
    }
}