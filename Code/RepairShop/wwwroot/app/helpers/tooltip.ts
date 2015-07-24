module App.Helpers
{
    export enum TooltipPosition
    {
        bottom,
        left,
        right,
        top
    }

    export interface ITooltip
    {
        title: string;
        position: string; // Get string from TooltipPosition
    }
}