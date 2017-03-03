var app = require('../app.js');

app.controller('AuthController', ['authService', function (authService) {
    this.loginUser = function ($event) {
        authService.loginUser({"login":this.login,"pass":this.password},(data) => {
            if(data){
                this.todoLists = data;
            }

        });
    };

    this.createNewUser = function () {
        authService.createNewUser({"login":this.login,"pass":this.password},(data) => {
            if(data){
                this.todoLists = data;
            }
        });
    }

}]);

app.directive('authForm', function () {
    return {
        controller: 'AuthController',
        controllerAs: "authCtrl",
        template: require("./auth-template.html")
    }
});