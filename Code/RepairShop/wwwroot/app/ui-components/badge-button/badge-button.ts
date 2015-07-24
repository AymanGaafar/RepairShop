module App.UIComponents
{
    interface IBadgeButtonController
    {
    }

    interface IBadgeButtonDirective extends ng.IDirective 
    {
    }

    interface IBadgeButtonScope extends ng.IScope
    {
        icon: string;
        mini: boolean;
        text: string;
        vm: IBadgeButtonController;
    }

    class BadgeButtonController implements IBadgeButtonController
    {
        constructor(private $scope: IBadgeButtonScope) 
        {
            $scope.vm = this;
        }
    }

    class BadgeButtonDirective implements IBadgeButtonDirective 
    {
        private static stylesLoaded = false;
        public static get directiveId(): string { return "badgeButton"; }

        private element: ng.IAugmentedJQuery = undefined;

        public controller = ($scope) => new BadgeButtonController($scope);
        public restrict: string = "E";
        public replace: boolean = true;
        public scope = { icon: "=", mini: "=", text: "=" };
        public templateUrl: string = Config.domain + "/app/ui-components/badge-button/badge-button.html";
        public transclude: boolean = false;

        public constructor(private $compile: ng.ICompileService)
        {
        }

        public link(scope: IBadgeButtonScope, element: ng.IAugmentedJQuery): void
        {
            this.element = element;

            if (!BadgeButtonDirective.stylesLoaded)
            {
                // Add the stylesheet link tag
                var stylesheet = document.createElement("link");
                stylesheet.rel = "stylesheet";
                stylesheet.href = Config.domain + "/app/ui-components/badge-button/badge-button.css";
                stylesheet.type = "text/css";

                document.getElementsByTagName('head')[0].appendChild(stylesheet);

                BadgeButtonDirective.stylesLoaded = true;
            }

            // Watch mini changes
            scope.$watch("mini", (newValue: boolean, oldValue: boolean) =>
            {
                if (typeof (newValue) === "boolean" && newValue)
                {
                    element.addClass("mini");
                }
                else
                {
                    element.removeClass("mini");
                }
            });
        }
    }

    // Init
    angular.module(Config.appName)
        .directive(BadgeButtonDirective.directiveId, ['$compile',
        ($compile) => new BadgeButtonDirective($compile)
    ]);
}