module App.ViewModels
{
    export class LoginViewModel extends BaseViewModel
    {
        static controllerId: string = "LoginViewModel";

        public username: string;
        public password: string;

        constructor(private $scope: IBaseScope<LoginViewModel>, private $http: ng.IHttpService) 
        {
            super();

            $scope.vm = this;

            //if (localStorage.getItem("tokenKey") != null)
            //{
            //    // Redirect to the App
            //}
        }

        public login_click(): void
        {
            var loginData = "userName=" + encodeURIComponent(this.username) +
                "&password=" + encodeURIComponent(this.password) +
                "&grant_type=password";

            var config = {
                method: 'POST',
                url: '/Token',
                data: loginData,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            };

            this.$http(config)
                .success(function (data: any, status, headers, config)
            {
                localStorage.clear();

                localStorage.setItem('tokenKey', data.access_token);
                location.replace("/");
            })
                .error(function (data, status, headers, config)
            {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }
    }

    // Init
    angular.module(Config.appName)
        .controller(LoginViewModel.controllerId, [
        '$scope', '$http',
        ($scope, $http) =>
            new LoginViewModel($scope, $http)
    ]);
}