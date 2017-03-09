var app = require('../app.js');

app.controller('ListController', ['todoService', 'columnsService', function (todoService, columnsService) {
    this.columns = columnsService.getColumns();
    this.filterParams = todoService.filterParams();
    this.selectedParam = this.filterParams[0];
    this.todoLists = [];

    todoService.getAllTodos((data) => {
        if (data) {
            this.todoLists = data;
        }
    });

    this.getTodos = function (column) {
        return todoService.getFilteredTodos(column);
    };

    this.getOrderParam = function () {
        return this.selectedParam;
    };

    this.setOrderParam = function (newParam) {
        this.selectedParam = newParam;
    }
}]);


