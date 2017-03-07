const app = require('../app.js');

app.controller('NavController', ['authService', function (authService) {
    this.show = authService.isLoggedIn();

    this.logOut = function () {
        authService.logOut();
    }
}]);

app.directive('appNavigation', function () {
    return {
        controller: 'NavController',
        controllerAs: "navCtrl",
        template: require("./nav-template.html")
    }
});