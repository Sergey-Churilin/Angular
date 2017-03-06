var app = require('../app.js');


app.controller('AuthController', ['authService','md5', function (authService,md5) {
    this.show = false;
    this.loginUser = ($event) => {
        $event.preventDefault();
        console.log(this.user)
        authService.loginUser({"login":this.user.login,"pass":md5.createHash(this.user.password),'remember':this.user.remember},(response) => {
            if(response){
                this.responseText = response.data;
                this.show = true;
            }

        });

    };

    this.createNewUser =  ($event) =>  {
        $event.preventDefault();
        console.log(this.user)
        authService.createNewUser({"login":this.user.login,"pass":md5.createHash(this.user.password),'remember':this.user.remember},(response) => {
            if(response){
                this.responseText = response.data;
                this.show = true;
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