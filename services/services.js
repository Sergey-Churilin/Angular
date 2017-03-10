var app = require('../app.js');

app.factory('todoService', ['$http','authService', function ($http,authService) {
    let todoServiceData = [];//JSON.parse(localStorage.getItem('allTodos'));
    if(!todoServiceData){
        todoServiceData = [];
    }
    let isDataDownloadedFromServer = false;
    let isDownloading = false;
    // const filterParams = ['deadline','title','-isUrgent'];
    const filterParams = [
        {'name':'Deadline','value':'deadline'},
        {'name':'Name','value':'title'},
        {'name':'Urgent','value':'-isUrgent'},
        ];
    const todoService = {};
    //get data
    todoService.getDataFromServer = function (callback) {
        const data = authService.getUser();
        $http({
            method: 'post',
            url: '/getdata',
            data: data
        }) .then((obj) => {
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
    todoService.addTodo = function (todo) {
        var newTodo = {'todo':todo,'user':authService.getUser()};
        todoServiceData.push(todo);
        localStorage.setItem('allTodos',JSON.stringify(todoServiceData));
        $http({
            method: 'post',
            url: '/addtodo',
            data: newTodo
        }).then(function successCallback(response) {
            console.log(response)

            //set temperary as stub
            isDataDownloadedFromServer = true;

        }, function errorCallback(response) {
            console.log('error')
        });
    };

    //update data
    todoService.updateTodo = function (todoToUpdate) {
        var data = {'todo':todoToUpdate,'user':authService.getUser()};
        $http({
            method: 'post',
            url: '/updatetodo',
            data: data
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

        var data = {'todo':todo,'user':authService.getUser()};
        $http({
            method: 'post',
            url: '/deletedata',
            data: data
        })            .then((obj) => {
            console.log(obj);
        },(error)=>{
            console.log(error);
        });


        todoServiceData.splice(findedTodoIndex, 1);
        localStorage.setItem('allTodos',JSON.stringify(todoServiceData));
     /*   $http.delete("/deletedata/"+todo.id)
            .then((obj) => {
                console.log(obj);
            },(error)=>{
                console.log(error);
            });*/


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

    todoService.filterParams = function () {
        return filterParams;
    };

    todoService.filterTodoBySearch = function (todo,searchValue) {
        let containsSearchVal = false;
        const neededString = searchValue.toLocaleLowerCase();
        if(todo.title){
            const neededTitle = todo.title.toLocaleLowerCase();
            if(neededTitle.indexOf(searchValue) >=0){
                containsSearchVal = true;
            }
        }

        if(!containsSearchVal){
            if(todo.description){
                const neededDesc = todo.description.toLocaleLowerCase();
                if(neededDesc.indexOf(searchValue) >=0){
                    containsSearchVal = true;
                }
            }
        }
        return containsSearchVal;
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

app.factory('authService', ['$http','$state',function ($http,$state) {
    const authService = {};
    // = false;
    let user = JSON.parse(localStorage.getItem('user'));
    let isLogged;
    authService.createNewUser = function (authData,callback) {
        if(authData.remember){
            localStorage.setItem('user',JSON.stringify(authData));
        }
        $http({
            method: 'post',
            url: '/adduser',
            data: authData
        }).then(function successCallback(response) {
            user = authData;
            isLogged = true;
            callback(response);
            $state.go('all')
            //TODO add user to local storage and check for data

        }, function errorCallback(response) {
            if(response.status=== 403){
                callback(response);
            }
            console.log('error')
        });
    };

    authService.loginUser = function (authData,callback) {
        if(authData.remember){
            localStorage.setItem('user',JSON.stringify(authData));
        }
        $http({
            method: 'post',
            url: '/loginuser',
            data: authData
        }).then(function successCallback(response) {
            user = authData;
            isLogged = true;
            callback(response);
            $state.go('all');
            console.log(response);
            //TODO add userTodos to local storage

        }, function errorCallback(response) {
            callback(response);
        });
    };

    authService.getUser = function () {
        if(Object.keys(user).length === 0){
            user = JSON.parse(localStorage.getItem('user'));
        }
        return user;
    };

    authService.isLoggedIn = function () {
        isLogged = (user && user != {});
        return isLogged;
    };

    authService.logOut = function () {
        user = null;
        localStorage.removeItem('user');
        //localStorage.removeItem('allTodos');
        $state.go('auth');
    };

    return authService;
}]);