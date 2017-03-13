const app = require('../app.js');

app.controller('NavController', ['$scope','authService','todoService', function ($scope,authService,todoService) {
    this.show = authService.isLoggedIn();

    $scope.$on('userLoggedIn',(event,args) => {
        this.show = true;
    });

    this.logOut = function () {
        authService.logOut();
        todoService.clearData();
        this.show = false;
    }
}]);

app.directive('appNavigation', function () {
    return {
        controller: 'NavController',
        controllerAs: "navCtrl",
        template: require("./nav-template.html")
    }
});