module App.Helpers
{
    export interface IToolbar
    {
        title: string;
        summary: string;

        actions: IToolbarAction[];

        backColor: string;
        color: string;
    }
}