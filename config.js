const app = require('./app.js');

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('auth');
    $stateProvider
        .state('all', {
            url: '/all',
            controller: 'ColumnController',
            template: require("./Components/ListWrapper/list-template.html")
        })
        .state('todo', {
            url: '/todo',
            controller: 'ColumnController',
            template: require("./Components/Columns/filteredColumn-template.html"),
            params: {
                id: 0
            }
        })
        .state('inprocess', {
            url: '/inprocess',
            controller: 'ColumnController',
            template: require("./Components/Columns/filteredColumn-template.html"),
            params: {
                id: 1
            }
        })
        .state('testing', {
            url: '/testing',
            controller: 'ColumnController',
            template: require("./Components/Columns/filteredColumn-template.html"),
            params: {
                id: 2
            }
        })
        .state('done', {
            url: '/done',
            controller: 'ColumnController',
            template: require("./Components/Columns/filteredColumn-template.html"),
            params: {
                id: 3
            }
        })
        .state('edittodo', {
            url: '/edittodo/:id',
            controller: 'EditTodoController',
            controllerAs: 'editCtrl',
            template: require("./Components/EditTodo/editTodo-template.html"),
        })
        .state('addtodo', {
            url: '/addtodo',
            controller: 'AddTodoController',
            controllerAs: 'addTodoCtrl',
            template: require("./Components/AddTodo/add-todo-template.html"),
        })
        .state('auth', {
            url: '/auth',
            controller: 'AuthController',
            controllerAs: 'authCtrl',
            template: require("./Components/Authorization/auth-template.html"),
        })
}]);
