var app = require('../app.js');

app.controller('ColumnController', ['$stateParams', '$scope','todoService', 'columnsService', function ($stateParams,$scope,todoService, columnsService) {
    $scope.columns = columnsService.getColumns();
    $scope.isUrgent = false;
    if($stateParams){
        $scope.column = $scope.columns[$stateParams.id];
    }

    $scope.filterParams = todoService.filterParams();
    $scope.selectedParam = $scope.filterParams[0].value;
    $scope.todoLists = [];

    todoService.getAllTodos((data) => {
        $scope.todoLists = data;
    });

    $scope.getTodos = (column) => {
        if (!column) column = $scope.column;
        return todoService.getFilteredTodos(column);
    };

    $scope.getOrderParam = function () {
        return $scope.selectedParam;
    };

    $scope.setOrderParam = function (newParam) {
        $scope.selectedParam = newParam;
    };

    $scope.showOnlyUrgent = function () {
        $scope.isUrgent = !$scope.isUrgent;
        $scope.$broadcast('showUrgent',{'show':$scope.isUrgent});
    };

    $scope.filterByValue = function () {
        $scope.$broadcast('searchByValue',{'searchValue':$scope.searchValue});
    }

}]);