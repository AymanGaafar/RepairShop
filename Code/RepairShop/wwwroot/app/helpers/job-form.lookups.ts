module App.Helpers
{
    export interface IJobFormLookups
    {
        clients: IKeyValueResult<string, string>[];
        conditions: IKeyValueResult<string, string>[];
        models: IKeyValueResult<string, string>[];
        repairReasons: IKeyValueResult<string, string>[];
        users: IKeyValueResult<string, string>[];
        workDone: IKeyValueResult<string, string>[];
    }
}