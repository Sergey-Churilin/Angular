const app = require('../../app.js');

app.controller('TodoController', ['$location', '$scope','todoService', function ($location,$scope, todoService) {
    this.column = $scope.todo.statusId.toString();
    this.showOnlyUrgent = false;
    this.searchValue = '';
    this.deleteTodo = function (todo) {
        todoService.deleteTodo(todo);
    };
    this.selectChanged = (column,todo) => {
        todoService.updateData($scope.columns[Number(column)],todo);
    };

    this.makeUrgent = ($event, todo) => {
        todoService.makeUrgent(todo);
    };
    
    $scope.$on("showUrgent",(event,args) => {
        this.showOnlyUrgent = args.show;
    });

    $scope.$on('searchByValue',(event,args) => {
        this.searchValue = args.searchValue;
    });

    this.showTodo = function (todo) {
        let show = true;

        if(this.searchValue){
            show = todoService.filterTodoBySearch(todo,this.searchValue);
        }

        if(this.showOnlyUrgent && show){
            show = todo.isUrgent;
        }

        return show;
    };
}]);

app.directive('oneTodo', function () {
    return {
        controller: 'TodoController',
        controllerAs: "todoCtrl",
        template: require("./oneTodo.html"),
        replace:true,
        scope:{
            'todo':'=',
            'columns':'='
        }
    }
});