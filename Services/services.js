const app = require('../app.js');

app.factory('todoService', ['$http', 'authService', function ($http, authService) {
    let todoServiceData = [];
    if (!todoServiceData) {
        todoServiceData = [];
    }
    let isDataDownloadedFromServer = authService.isLoggedIn();
    let isDownloading = false;

    const filterParams = [
        {'name': '-------Choose Filter------', 'value': ''},
        {'name': 'Deadline', 'value': 'deadlineTimestamp'},
        {'name': 'Name', 'value': 'title'},
        {'name': 'Urgent', 'value': '-isUrgent'},
    ];
    const todoService = {};

    //get data
    todoService.getDataFromServer = function (callback) {
        const data = authService.getUser();
        $http({
            method: 'post',
            url: '/getdata',
            data: data
        }).then((obj) => {
            todoServiceData = todoServiceData.concat(obj.data);
            localStorage.setItem('allTodos', JSON.stringify(todoServiceData));
            isDataDownloadedFromServer = true;
            isDownloading = false;
            return callback(todoServiceData);
        }, (error) => {
            isDownloading = false;
            return callback('');
        });
    };

    //add data
    todoService.addTodo = function (todo) {
        const newTodo = {'todo': todo, 'user': authService.getUser()};
        todoServiceData.push(todo);
        localStorage.setItem('allTodos', JSON.stringify(todoServiceData));
        $http({
            method: 'post',
            url: '/addtodo',
            data: newTodo
        }).then(function successCallback(response) {

            //set temperary as stub
            isDataDownloadedFromServer = true;

        }, function errorCallback(response) {
            console.log('error on client in adding todo')
        });
    };

    //update data
    todoService.updateTodo = function (todoToUpdate) {
        const data = {'todo': todoToUpdate, 'user': authService.getUser()};
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

        const data = {'todo': todo, 'user': authService.getUser()};
        $http({
            method: 'post',
            url: '/deletedata',
            data: data
        }).then((obj) => {
            console.log(obj);
        }, (error) => {
            console.log(error);
        });

        todoServiceData.splice(findedTodoIndex, 1);
        localStorage.setItem('allTodos', JSON.stringify(todoServiceData));
    };


    todoService.getAllTodos = function (callback) {

        if (callback && !isDownloading) {
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
        return todoServiceData.find((neededTodo) => {
            if (neededTodo.id === Number(id)) {
                return neededTodo;
            }
        });
    };

    todoService.makeUrgent = function (todo) {
        const findedTodo = todoServiceData.find((neededTodo) => neededTodo.id === todo.id);
        findedTodo.isUrgent = !findedTodo.isUrgent;
        localStorage.setItem('allTodos', JSON.stringify(todoServiceData));
        this.updateTodo(findedTodo);
    };

    todoService.updateData = function (column, todo, callback) {
        const neededId = todo.id || Number(todo);
        const findedTodo = todoServiceData.find(
            (neededTodo) => neededTodo.id === neededId);
        if (findedTodo) {
            let newStatus = column.id;
            if (typeof newStatus !== 'number') {
                newStatus = Number(column);
            }
            if (findedTodo.statusId === newStatus) {
                if (callback) {
                    callback(false);
                }
                return;
            }
            findedTodo.statusId = newStatus;
            if (status) {
                findedTodo.status = status;
            }
            findedTodo.status = column.name;
            if (column.name) {
                findedTodo.status = column.name;
            }
            localStorage.setItem('allTodos', JSON.stringify(todoServiceData));
            this.updateTodo(findedTodo);
            if (callback) {
                callback(true);
            }
        }
    };

    todoService.filterParams = function () {
        return filterParams;
    };

    todoService.filterTodoBySearch = function (todo, searchValue) {
        let containsSearchVal = false;
        const neededString = searchValue.toLocaleLowerCase();
        if (todo.title) {
            const neededTitle = todo.title.toLocaleLowerCase();
            if (neededTitle.indexOf(searchValue) >= 0) {
                containsSearchVal = true;
            }
        }

        if (!containsSearchVal) {
            if (todo.description) {
                const neededDesc = todo.description.toLocaleLowerCase();
                if (neededDesc.indexOf(searchValue) >= 0) {
                    containsSearchVal = true;
                }
            }
        }
        return containsSearchVal;
    };

    todoService.clearData = function () {
        todoServiceData.length = 0;
        isDataDownloadedFromServer = false;
    };

    return todoService;
}]);


app.factory('columnsService', function () {
    const columnsService = {};
    const columns = [{
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

app.factory('authService', ['$http', '$state','$rootScope', function ($http, $state,$rootScope) {
    const authService = {};

    let user = JSON.parse(localStorage.getItem('user'));
    let isLogged;
    authService.createNewUser = function (authData, callback) {
        if (authData.remember) {
            localStorage.setItem('user', JSON.stringify(authData));
        }else {
            if(user){
                localStorage.removeItem('user');
            }
        }
        $http({
            method: 'post',
            url: '/adduser',
            data: authData
        }).then(function successCallback(response) {
            user = authData;
            isLogged = true;
            callback(response);
            $rootScope.$broadcast('userLoggedIn');
            $state.go('all');
            //TODO add user to local storage and check for data

        }, function errorCallback(response) {
            if (response.status === 403) {
                callback(response);
            }
            console.log('error')
        });
    };

    authService.loginUser = function (authData, callback) {
        if (authData.remember) {
            localStorage.setItem('user', JSON.stringify(authData));
        } else {
            if(user){
                localStorage.removeItem('user');
            }
        }
        $http({
            method: 'post',
            url: '/loginuser',
            data: authData
        }).then(function successCallback(response) {
            user = authData;
            isLogged = true;
            callback(response);
            $rootScope.$broadcast('userLoggedIn');
            $state.go('all');
            console.log(response);
        }, function errorCallback(response) {
            callback(response);
        });
    };

    authService.getUser = function () {
        if (Object.keys(user).length === 0) {
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
        localStorage.clear();
        $state.go('auth');
    };

    return authService;
}]);