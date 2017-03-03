var app = require('../app.js');

app.controller('ListController', ['$scope','$state','todoService','columnsService', function ($scope,$state,todoService,columnsService) {
/*    $scope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams, error) {
        $state.go("auth");
    });

    $state.go("auth");*/
    // if(){

    // }

    this.columns = columnsService.getColumns();

    this.todoLists = [];
    todoService.getAllTodos((data) => {
        if(data){
            this.todoLists = data;
        }

    });

    this.getTodos = function (column) {
        return todoService.getFilteredTodos(column);
    };
}]);

app.directive('todoList', function () {
    return {
        controller: 'ListController',
        controllerAs: "listCtrl",
        template: require("./list-template.html")
    }
});

app.directive('oneColumn', function () {
    return {
        controller: 'ListController',
        controllerAs: "listCtrl",
        template: require("./oneColumn-template.html"),
        replace:true
    }
});

