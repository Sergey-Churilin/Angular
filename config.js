const app = require('./app.js');

const config =  app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('auth');
    $stateProvider
        .state('all', {
            url: '/all',
            controller:'ListController',
            controllerAs:'listCtrl',
            template:require("./ListWrapper/list-template.html")
            // templateUrl: "ListWrapper/list-template.html",
        })
        .state('todo', {
            url: '/todo',
            controller:'ColumnController',
            controllerAs:'colCtrl',
            template:require("./Columns/filteredColumn-template.html"),
            // templateUrl: "Columns/filteredColumn-template.html",
            params:{
                id:0
            }
        })
        .state('inprocess', {
            url: '/inprocess',
            controller:'ColumnController',
            controllerAs:'colCtrl',
            template:require("./Columns/filteredColumn-template.html"),
            // templateUrl: "Columns/filteredColumn-template.html",
            params:{
                id:1
            }
        })
        .state('testing', {
            url: '/testing',
            controller:'ColumnController',
            controllerAs:'colCtrl',
            template:require("./Columns/filteredColumn-template.html"),
            // templateUrl: "Columns/filteredColumn-template.html",
            params:{
                id:2
            }
        })
        .state('done', {
            url: '/done',
            controller:'ColumnController',
            controllerAs:'colCtrl',
            template:require("./Columns/filteredColumn-template.html"),
            // templateUrl: "Columns/filteredColumn-template.html",
            params:{
                id:3
            }
        })
        .state('edittodo', {
            url: '/edittodo/:id',
            controller:'EditTodoController',
            controllerAs:'editCtrl',
            template:require("./EditTodo/editTodo-template.html"),
            // templateUrl: "EditTodo/editTodo-template.html",
        })
        .state('addtodo', {
            url: '/addtodo',
            controller:'AddTodoController',
            controllerAs:'addTodoCtrl',
            template:require("./AddTodo/add-todo-template.html"),
            // templateUrl: "AddTodo/add-todo-template.html",
        })
        .state('auth', {
            url: '/auth',
            controller:'AuthController',
            controllerAs:'authCtrl',
            template:require("./Authorization/auth-template.html"),
            // templateUrl: "Authorization/auth-template.html",
        })
}]);
