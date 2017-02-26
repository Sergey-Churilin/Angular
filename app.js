var app = angular.module('app', ['ui.router', 'form']);

app.controller('ListController', ['$location', 'todoService', '$timeout', function ($location, todoService, $timeout) {
    this.shownStatus = $location.search['shownStatus'];
    this.columns = columns;
    this.todoLists = [];
    todoService.getDataFromServer((data) => {
        this.todoLists = data;
    });

    this.makeUrgent = ($event,todo) => {
        var currenEl = $event.currentTarget;
        var parent = currenEl.parentNode;
        if (parent.classList.contains('urgentTask')) {
            parent.classList.remove('urgentTask');
            currenEl.setAttribute('checked', false);
        }
        else {
            parent.classList.add('urgentTask');
            currenEl.setAttribute('checked', true);
        }
        todoService.makeUrgent(todo);
    };

    this.selectChanged =  (todoStatus,todo) => {
         var statusId = this.columns.indexOf(todoStatus);
        todoService.updateData(todo,statusId,todoStatus);
    };
}]);

app.directive('todoList', function () {
    return {
        controller: 'ListController',
        controllerAs: "listCtrl",
        templateUrl: "list-template.html",
    }
});

/*app.directive('oneTodo',function () {
    return {
        controller:'ListController',
        controllerAs:"listCtrl",
        templateUrl: "oneTodo.html",
        scope: true
    }
});*/

app.filter('stateFilter', function () {
    return function (list, index) {
        if (list.statusId === index)
            return list;
    }
});

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    // $urlRouterProvider.otherwise('index.html');
    $stateProvider
        .state('all', {
            url: '/all',
            controller:'ListController',
            controllerAs:'list',
            templateUrl: "list-template.html",
        })
        .state('todo', {
            url: '/todo',
            controller:'ListController',
            controllerAs:'list',
            templateUrl: "list-template.html",
        })
        .state('inprocess', {
            url: '/inprocess',
            controller:'ListController',
            controllerAs:'list',
            templateUrl: "list-template.html",
        })
        .state('testing', {
            url: '/testing',
            controller:'ListController',
            controllerAs:'list',
            templateUrl: "list-template.html",
        })
        .state('done', {
            url: '/done',
            controller:'ListController',
            controllerAs:'list',
            templateUrl: "list-template.html",
        })
        .state('addtodo', {
            url: '/addtodo',
            controller:'FormController',
            controllerAs:'formCtrl',
            templateUrl: "form/form-template.html",
        })
}]);
app.factory('todoService', ['$http', function ($http) {
    var todoServiceData = [];

    return {
        getDataFromServer: function (callback) {
            $http.get("data.json")
                .then((obj) => {
                    todoServiceData = obj.data;
                    return callback(todoServiceData);
                });
        },

        getData: function () {
            return todoServiceData;
        },
        addData: function (newTodo) {
            todoServiceData.push(newTodo);
        },
        makeUrgent: function (todo) {
            todo.isUrgent = !todo.isUrgent;
        },
        updateData: function(todo,statusId,status){
            todo.statusId = statusId;
            todo.status = status;
        }
    };
}]);


