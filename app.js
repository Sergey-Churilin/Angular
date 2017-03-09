var app = angular.module('app', ['ui.router','angular-md5','ui.bootstrap','ngAnimate']);


app.run(['$rootScope', '$state','authService', function ($rootScope, $state,authService) {
        $rootScope.$on('$stateChangeStart', function (event,toState,toParams,fromState) {
            $rootScope.previousState = fromState;
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


