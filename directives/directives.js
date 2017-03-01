app.directive('todoList', function () {
    return {
        controller: 'ListController',
        controllerAs: "listCtrl",
        templateUrl: "list-template.html",
    }
});


app.directive('oneTodo', function () {
    return {
        controller: 'TodoController',
        controllerAs: "todoCtrl",
        templateUrl: "templates/oneTodo.html",
        replace:true,
        scope:{
            'todo':'=',
            'columns':'='
        }
    }
});

app.directive('oneColumn', function () {
    return {
        controller: 'ListController',
        controllerAs: "listCtrl",
        templateUrl: "templates/oneColumn-template.html",
        replace:true
    }
});

/*app.directive('filteredTodo', function () {
    return {
        controller: 'ColumnController',
        controllerAs: "colCtrl",
        templateUrl: "app/templates/oneColumn-template.html",
        replace:true
    }
});*/
