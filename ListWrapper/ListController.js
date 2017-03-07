var app = require('../app.js');

app.controller('ListController', ['$scope','$state','todoService','columnsService','authService', function ($scope,$state,todoService,columnsService,authService) {
    this.show = authService.isLoggedIn();
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

    this.logOut = function () {
        authService.logOut();
    }
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

