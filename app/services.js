app.factory('todoService', ['$http', function ($http) {
    let todoServiceData = [];
    let isDataDownloadedFromServer = false;
    let isDownloading = false;
    const todoService = {};

    //get data
    todoService.getDataFromServer = function (callback) {
        console.log('send request')
        $http.get("/getdata")
            .then((obj) => {
                console.log(obj.data)
                todoServiceData = todoServiceData.concat(obj.data);
                isDataDownloadedFromServer = true;
                return callback(todoServiceData);
            }, (error) => {
                isDownloading = false;
                return callback('');
            });
    };

    //add data
    todoService.addTodo = function (newTodo) {
        // newTodo.id = todoServiceData.length;
        todoServiceData.push(newTodo);
        $http({
            method: 'post',
            url: '/addtodo',
            data: newTodo
        }).then(function successCallback(response) {
            console.log(response)

        }, function errorCallback(response) {
            console.log('error')
        });
    };

    //update data
    todoService.updateTodo = function (todo) {
        //saveDataOnServer
    };

    //delete todo
    todoService.deleteTodo = function (todo) {
        const findedTodoIndex = todoServiceData.findIndex((neededTodo, index) => {
            if (neededTodo.id === todo.id) {
                return true;
            }
        });

        $http.delete("/deletedata/"+todo.id)
            .then((obj) => {
                console.log(obj);
            },(error)=>{
                console.log(error);
            });

        todoServiceData.splice(findedTodoIndex, 1);
    };

    todoService.getAllTodos = function (callback) {
        if (callback && !isDownloading) {
            isDownloading = true;
            if (!isDataDownloadedFromServer) {
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

    todoService.makeUrgent = function (todo) {
        const findedTodo = todoServiceData.find((neededTodo) => neededTodo.id === todo.id);
        findedTodo.isUrgent = !findedTodo.isUrgent;
    };


    todoService.updateData = function (column, todo, status) {
        const findedTodo = todoServiceData.find((neededTodo) => neededTodo.id === todo.id);
        if (findedTodo) {
            findedTodo.statusId = Number(column);
            findedTodo.status = status;
        }
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