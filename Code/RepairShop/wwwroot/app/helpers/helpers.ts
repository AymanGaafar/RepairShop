module App.Helpers
{
    export function isArray(obj)
    {
        return angular.isArray(obj);
    }

    export function isFunction(obj)
    {
        var getType = {};

        return obj && getType.toString.call(obj) === '[object Function]';
    }
}