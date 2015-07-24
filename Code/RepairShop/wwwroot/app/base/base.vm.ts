module App.ViewModels
{
    export interface IBaseScope<T extends BaseViewModel> extends ng.IScope
    {
        vm: T
    }

    export class BaseViewModel
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties
        //#endregion

        //#region Private Properties
        //#endregion

        //#region Protected Properties

        protected _status: UIComponents.IStatusReporter =
        {
            color: "",
            description: "",
            isBusy: false,
            progress: 0,
            progressType: "",
            title: ""
        };

        //#endregion

        //#region Public Properties

        public get status(): UIComponents.IStatusReporter { return this._status; }

        //#endregion

        //#region Constructors
        //#endregion

        //#region Private Methods
        //#endregion

        //#region Public Methods

        public log(obj: any): void
        {
            console.log(obj);
        }

        //#endregion
    }
}