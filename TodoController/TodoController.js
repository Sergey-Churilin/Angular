var app = require('../app.js');

app.controller('TodoController', ['$location', '$scope','todoService', function ($location,$scope, todoService) {
    this.column = $scope.todo.statusId.toString();
    this.deleteTodo = function (todo) {
        todoService.deleteTodo(todo);
    };
    this.selectChanged = (column,todo) => {
        todoService.updateData(column,todo,$scope.columns[Number(column)].name);
    };

    this.makeUrgent = ($event, todo) => {
        todoService.makeUrgent(todo);
    };

}]);

app.directive('oneTodo', function () {
    return {
        controller: 'TodoController',
        controllerAs: "todoCtrl",
        template: require("./oneTodo.html"),
        replace:true,
        scope:{
            'todo':'=',
            'columns':'='
        }
    }
});