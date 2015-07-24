module App.Models
{
    export interface IContactInfo
    {
        EmailAddress: string;
        FaxNumber: string;
        MobileNumber: string;
        PhoneNumber: string;
    }

    export class ContactInfo implements IContactInfo
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties
        //#endregion

        //#region Private Properties
        //#endregion

        //#region Public Properties

        //#region Table Properties

        public EmailAddress: string;
        public FaxNumber: string;
        public MobileNumber: string;
        public PhoneNumber: string;

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