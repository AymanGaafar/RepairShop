module App
{
    angular.module(Config.appName, ['ngRoute', 'breeze.angular', 'ngzWip', 'ui.bootstrap.datetimepicker'])
        .config(["$routeProvider", "$locationProvider", configRouter])
        .config(['$httpProvider', configHttp])
        .config(['zStorageConfigProvider', configWip]);

    function configRouter($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider)
    {
        $locationProvider.html5Mode(true);
    }

    function configHttp($httpProvider: ng.IHttpProvider)
    {
        var token = localStorage.getItem("tokenKey");

        if (token != null)
        {
            $httpProvider.defaults.headers.common.Authorization = 'Bearer ' + token;
        }
    }

    function configWip(cfg)
    {
        cfg.config = {
            // Must set these
            key: Config.appName, // Identifier for the app
            wipKey: Config.appName + '.WIP', // Identifer for the app's 
            version: '1.0.0', // Your app's version 

            // These are defaulted, but can be overriden
            enabled: true, // enable Local Storage (WIP is always enabled)
            events: { // names of events that WIP will fire
                error: 'store.error',
                storeChanged: 'store.changed',
                wipChanged: 'wip.changed'
            },
            //appErrorPrefix: '[ngzWip] ', // optional prefix for any error messages
            //newGuid: breeze.core.getUuid // GUID function generator
        };
    }

    angular.element(document).ready(function ()
    {
        angular.bootstrap(document, [Config.appName]);
    });
}