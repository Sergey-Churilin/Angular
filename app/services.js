app.factory('todoService', ['$http', function ($http) {
    let todoServiceData = [];
    let isDataDownloadedFromServer = false;
    const todoService = {};
    todoService.getDataFromServer = function (callback) {
        $http.get("app/data.json")
            .then((obj) => {
                todoServiceData = todoServiceData.concat(obj.data);
                isDataDownloadedFromServer = true;
                return callback(todoServiceData);
            });
    };

    todoService.getAllTodos = function (callback) {
        if (callback){
            if(!isDataDownloadedFromServer){
                return this.getDataFromServer(callback);
            } else {
                return callback(todoServiceData);
            }
        }
        return todoServiceData;
    };

    todoService.getFilteredTodos = function (column) {
        return todoServiceData.filter((todo) => {
            return todo.statusId === column.id;
        });
    };

    todoService.getTodo = function (id) {
        return todoServiceData.find((neededTodo) => neededTodo.id === id);
    };

    todoService.addTodo = function (newTodo) {
        // newTodo.id = todoServiceData.length;
        todoServiceData.push(newTodo);
    };

    todoService.makeUrgent = function (todo) {
        const findedTodo = todoServiceData.find((neededTodo) => neededTodo.id === todo.id);
        findedTodo.isUrgent = !findedTodo.isUrgent;
    };

    todoService.updateTodo = function(todo){
        //saveDataOnServer
    };

    todoService.updateData = function (column, todo, status) {
        const findedTodo = todoServiceData.find((neededTodo) => neededTodo.id === todo.id);
        if (findedTodo) {
            findedTodo.statusId = Number(column);
            findedTodo.status = status;
        }
    };

    todoService.deleteTodo = function (todo) {
        const findedTodoIndex = todoServiceData.findIndex((neededTodo, index) => {
            if (neededTodo.id === todo.id) {
                return true;
            }
        });
        todoServiceData.splice(findedTodoIndex, 1);
    };

    return todoService;
}]);



app.factory('columnsService', function () {
    var columnsService = {};
    var columns = [{
        'name': 'Todo',
        'id': 0
    }, {
        'name': 'In Process',
        'id': 1
    }, {
        'name': 'Testing',
        'id': 2
    }, {
        'name': 'Done',
        'id': 3
    }];

    columnsService.getColumns = function () {
        return columns;
    };

    return columnsService;
});