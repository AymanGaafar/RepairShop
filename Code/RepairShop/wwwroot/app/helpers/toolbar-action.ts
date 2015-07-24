module App.Helpers
{
    export interface IToolbarAction 
    {
        title: string;
        tooltip: ITooltip;

        icon?: string;
        color?: string;
        backColor?: string;

        // Events
        click?: (e: any) => void;
    }
}