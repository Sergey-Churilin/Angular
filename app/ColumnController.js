app.controller('ColumnController', ['$location', '$stateParams','todoService','columnsService',
    function ($location,$stateParams, todoService,columnsService) {

    this.columns = columnsService.getColumns();
    this.column = this.columns[$stateParams.id];
    this.todoLists = [];
    todoService.getAllTodos((data) => {
        this.todoLists = data;
    });

    this.getTodos = (column) => {
        if(!column) column = this.column;
        return todoService.getFilteredTodos(column);
    };

}]);