app.controller('ListController', ['todoService','columnsService', function (todoService,columnsService) {
    this.columns = columnsService.getColumns();

    this.todoLists = [];
    todoService.getAllTodos((data) => {
        this.todoLists = data;
    });

    this.getTodos = function (column) {
        return todoService.getFilteredTodos(column);
    };
}]);