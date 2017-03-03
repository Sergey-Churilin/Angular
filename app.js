var app = angular.module('app', ['ui.router']);


app.run(['$rootScope', '$state','$location', 'authService', function ($rootScope, $state,$location,authService) {
        $rootScope.$on('$stateChangeStart', function (event,toState) {

            if (!authService.isLoggedIn() && toState.name !== 'auth') {
                console.log('DENY : Redirecting to Login');
                event.preventDefault();
                $state.go('auth')
            }
            else {
                console.log('ALLOW');
            }
        });
    }]);

module.exports = app;
//


