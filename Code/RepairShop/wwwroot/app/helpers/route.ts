module App.Helpers
{
    export interface IRoute
    {
        title: string;

        url: string;

        templateUrl: string;

        controller?: string;
        controllerAs?: string;
    }
}