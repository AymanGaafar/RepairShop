module App.UIComponents
{
    interface IStatusReporterController
    {
    }

    interface IStatusReporterDirective extends ng.IDirective 
    {
    }

    export interface IStatusReporter
    {
        color: string;
        description: string;
        isBusy: boolean;
        progress: number;
        progressType: string;
        title: string;
    }

    interface IStatusReporterScope extends ng.IScope, IStatusReporter
    {
        vm: StatusReporterController;
    }

    class StatusReporterController implements IStatusReporterController
    {
        constructor(private $scope: IStatusReporterScope) 
        {
            $scope.vm = this;
        }
    }

    export class StatusReporterDirective implements IStatusReporterDirective
    {
        private static stylesLoaded = false;
        public static get directiveId(): string { return "statusReporter"; }

        public controller = ($scope) => new StatusReporterController($scope);
        public restrict: string = "E";
        public replace: boolean = true;
        public scope = { active: "=", color: "=", description: "=", progress: "=", progressType: "=", title: "=" };
        public templateUrl: string = Config.domain + "/app/ui-components/status-reporter/status-reporter.html";

        public link(scope: IStatusReporterScope, element: ng.IAugmentedJQuery): void
        {
            if (!StatusReporterDirective.stylesLoaded)
            {
                // Add the stylesheet link tag
                var stylesheet = document.createElement("link");
                stylesheet.rel = "stylesheet";
                stylesheet.href = Config.domain + "/app/ui-components/status-reporter/status-reporter.css";
                stylesheet.type = "text/css";

                document.getElementsByTagName('head')[0].appendChild(stylesheet);

                StatusReporterDirective.stylesLoaded = true;
            }
        }
    }

    // Init
    angular.module(Config.appName)
        .directive(StatusReporterDirective.directiveId, [() => new StatusReporterDirective()]);
}