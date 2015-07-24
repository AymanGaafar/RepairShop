module App.Helpers
{
    export interface IConfig
    {
        name: string;
        title: string;
        dependencies?: string[];
    }
}