app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('all');
    $stateProvider
        .state('all', {
            url: '/all',
            controller:'ListController',
            controllerAs:'listCtrl',
            templateUrl: "templates/list-template.html",
        })
        .state('todo', {
            url: '/todo',
            controller:'ColumnController',
            controllerAs:'colCtrl',
            templateUrl: "templates/filteredColumn-template.html",
            params:{
                id:0
            }
        })
        .state('inprocess', {
            url: '/inprocess',
            controller:'ColumnController',
            controllerAs:'colCtrl',
            templateUrl: "templates/filteredColumn-template.html",
            params:{
                id:1
            }
        })
        .state('testing', {
            url: '/testing',
            controller:'ColumnController',
            controllerAs:'colCtrl',
            templateUrl: "templates/filteredColumn-template.html",
            params:{
                id:2
            }
        })
        .state('done', {
            url: '/done',
            controller:'ColumnController',
            controllerAs:'colCtrl',
            templateUrl: "templates/filteredColumn-template.html",
            params:{
                id:3
            }
        })
        .state('edittodo', {
            url: '/edittodo/:id',
            controller:'EditTodoController',
            controllerAs:'editCtrl',
            templateUrl: "templates/editTodo-template.html",
        })
        .state('addtodo', {
            url: '/addtodo',
            controller:'FormController',
            controllerAs:'formCtrl',
            templateUrl: "form/form-template.html",
        })
}]);