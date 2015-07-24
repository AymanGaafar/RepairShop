module App.Models
{
    export interface IAddress
    {
        Line1: string;
        Line2: string;
        Line3: string;
        PostalCode: string;
        City: string;
        GoverningDistrict: string;
        Country: string;
    }

    export class Address implements IAddress
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties
        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties

        //#region Table Properties

        public Line1: string;
        public Line2: string;
        public Line3: string;
        public PostalCode: string;
        public City: string;
        public GoverningDistrict: string;
        public Country: string;

        //#endregion
        //#endregion

        //#region Constructors
        //#endregion

        //#region Private Methods
        //#endregion

        //#region Public Methods
        //#endregion
    }
}