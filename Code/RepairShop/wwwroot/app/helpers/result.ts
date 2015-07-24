module App.Helpers
{
    export interface IResult<T>
    {
        /** Top level entities returned */
        Data: T;
        /** Url queried */
        Uri: string;
    }

    export interface IResultCollection<T> extends IResult<T>
    {
        Pagination?: IPagination;
    }
}