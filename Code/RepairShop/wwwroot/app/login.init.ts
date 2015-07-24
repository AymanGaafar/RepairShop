module App
{
    angular.module(Config.appName, []);

    angular.element(document).ready(function ()
    {
        angular.bootstrap(document, [Config.appName]);
    });
}