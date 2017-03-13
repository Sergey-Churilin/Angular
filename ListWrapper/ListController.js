const app = require('../app.js');

app.controller('ListController', ['$scope', 'todoService', 'columnsService', function ($scope, todoService, columnsService) {
    $scope.columns = columnsService.getColumns();
    $scope.filterParams = todoService.filterParams();
    $scope.selectedParam = $scope.filterParams[0];
    $scope.todoLists = [];

    todoService.getAllTodos((data) => {
        if (data) {
            $scope.todoLists = data;
        }
    });

    $scope.getTodos = function (column) {
        return todoService.getFilteredTodos(column);
    };

    $scope.getOrderParam = function () {
        return $scope.selectedParam;
    };

    $scope.setOrderParam = function (newParam) {
        $scope.selectedParam = newParam;
    }
}]);


