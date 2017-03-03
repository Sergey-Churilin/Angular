var app = require('./app.js');

const config =  app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('auth');
    $stateProvider
        .state('all', {
            url: '/all',
            controller:'ListController',
            controllerAs:'listCtrl',
            templateUrl: "ListWrapper/list-template.html",
        })
        .state('todo', {
            url: '/todo',
            controller:'ColumnController',
            controllerAs:'colCtrl',
            templateUrl: "Columns/filteredColumn-template.html",
            params:{
                id:0
            }
        })
        .state('inprocess', {
            url: '/inprocess',
            controller:'ColumnController',
            controllerAs:'colCtrl',
            templateUrl: "Columns/filteredColumn-template.html",
            params:{
                id:1
            }
        })
        .state('testing', {
            url: '/testing',
            controller:'ColumnController',
            controllerAs:'colCtrl',
            templateUrl: "Columns/filteredColumn-template.html",
            params:{
                id:2
            }
        })
        .state('done', {
            url: '/done',
            controller:'ColumnController',
            controllerAs:'colCtrl',
            templateUrl: "Columns/filteredColumn-template.html",
            params:{
                id:3
            }
        })
        .state('edittodo', {
            url: '/edittodo/:id',
            controller:'EditTodoController',
            controllerAs:'editCtrl',
            templateUrl: "EditTodo/editTodo-template.html",
        })
        .state('addtodo', {
            url: '/addtodo',
            controller:'FormController',
            controllerAs:'formCtrl',
            templateUrl: "form/form-template.html",
        })
        .state('auth', {
            url: '/auth',
            controller:'AuthController',
            controllerAs:'authCtrl',
            templateUrl: "Authorization/auth-template.html",
        })
}]);

//module.exports = config;