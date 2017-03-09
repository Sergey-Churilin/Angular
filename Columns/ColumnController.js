var app = require('../app.js');

app.controller('ColumnController', ['$stateParams','todoService', 'columnsService', function ($stateParams,todoService, columnsService) {
    this.columns = columnsService.getColumns();
    this.column = this.columns[$stateParams.id];
    this.filterParams = todoService.filterParams();
    this.selectedParam = this.filterParams[0];
    this.todoLists = [];

    todoService.getAllTodos((data) => {
        this.todoLists = data;
    });

    this.getTodos = (column) => {
        if (!column) column = this.column;
        return todoService.getFilteredTodos(column);
    };

    this.getOrderParam = function () {
        return this.selectedParam;
    };

    this.setOrderParam = function (newParam) {
        console.log(newParam)
        this.selectedParam = newParam;
    }

}]);