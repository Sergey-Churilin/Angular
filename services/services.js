var app = require('../app.js');

app.factory('todoService', ['$http', function ($http) {
    let todoServiceData = [];//JSON.parse(localStorage.getItem('allTodos'));
    if(!todoServiceData){
        todoServiceData = [];
    }
    let isDataDownloadedFromServer = false;
    let isDownloading = false;
    const todoService = {};
    //get data
    todoService.getDataFromServer = function (callback) {
        $http.get("/getdata")
            .then((obj) => {
                todoServiceData = todoServiceData.concat(obj.data);
                localStorage.setItem('allTodos',JSON.stringify(todoServiceData));
                isDataDownloadedFromServer = true;
                isDownloading = false;
                return callback(todoServiceData);
            }, (error) => {
                isDownloading = false;
                console.log('error to download')
                return callback('');
            });
    };

    //add data
    todoService.addTodo = function (newTodo) {
        todoServiceData.push(newTodo);
        localStorage.setItem('allTodos',JSON.stringify(todoServiceData));

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
        $http({
            method: 'post',
            url: '/updatetodo',
            data: todo
        }).then(function successCallback(response) {
            console.log(response)

        }, function errorCallback(response) {
            console.log('error')
        });
    };

    //delete todo
    todoService.deleteTodo = function (todo) {
        const findedTodoIndex = todoServiceData.findIndex((neededTodo, index) => {
            if (neededTodo.id === todo.id) {
                return true;
            }
        });
        todoServiceData.splice(findedTodoIndex, 1);
        localStorage.setItem('allTodos',JSON.stringify(todoServiceData));
        $http.delete("/deletedata/"+todo.id)
            .then((obj) => {
                console.log(obj);
            },(error)=>{
                console.log(error);
            });


    };

    todoService.getAllTodos = function(callback){

        if (callback && !isDownloading) {
/*            if(todoServiceData.length > 0){
                return callback(todoServiceData);
            }*/

            isDownloading = true;
            if (!isDataDownloadedFromServer) {
                return this.getDataFromServer(callback);
            } else {
                isDownloading = false;
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
        localStorage.setItem('allTodos',JSON.stringify(todoServiceData));
        this.updateTodo(findedTodo);
    };


    todoService.updateData = function (column, todo, status) {
        const findedTodo = todoServiceData.find((neededTodo) => neededTodo.id === todo.id);
        if (findedTodo) {
            findedTodo.statusId = Number(column);
            findedTodo.status = status;
            localStorage.setItem('allTodos',JSON.stringify(todoServiceData));
            this.updateTodo(findedTodo);
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

app.factory('authService', ['$http',function ($http) {
    const authService = {};

    authService.createNewUser = function (authData,callback) {
        $http({
            method: 'post',
            url: '/addUser',
            data: authData
        }).then(function successCallback(response) {
            console.log(response)
            //TODO add user to local storage and check for data

        }, function errorCallback(response) {
            console.log('error')
        });
    };

    authService.loginUser = function (authData,callback) {
        $http({
            method: 'post',
            url: '/loginUser',
            data: authData
        }).then(function successCallback(response) {
            console.log(response)
            //TODO add userTodos to local storage

        }, function errorCallback(response) {
            console.log('error')
        });
    };

    authService.isLoggedIn = function () {
        return false;
    };

    return authService;
}]);