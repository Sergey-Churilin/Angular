var app = angular.module('app', ['ui.router','angular-md5','ui.bootstrap','ngAnimate','ngDragDrop']);


app.run(['$rootScope', '$state','authService', function ($rootScope, $state,authService) {
        $rootScope.$on('$stateChangeStart', function (event,toState,toParams,fromState) {
            $rootScope.previousState = fromState;
            if (!authService.isLoggedIn()) {
                if(toState.name !== 'auth'){
                    console.log('DENY : Redirecting to Login');
                    event.preventDefault();
                    $state.go('auth')
                }
            }
            else {
                if(toState.name === 'auth'){
                    event.preventDefault();
                    $state.go('all');
                }
            }
        });
    }]);

module.exports = app;

