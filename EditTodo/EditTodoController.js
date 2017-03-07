const app = require('../app.js');

app.controller('EditTodoController', ['$stateParams', '$state', '$rootScope', 'todoService', 'columnsService',
    function ($stateParams, $state, $rootScope, todoService,columnsService) {
        this.todo = todoService.getTodo($stateParams.id);
        // this.column = $scope.todo.statusId.toString();
        this.columns = columnsService.getColumns();
        if (!this.todo) {
            todoService.getAllTodos((data) => {
                this.todo = todoService.getTodo(Number($stateParams.id));
            });
        }

        this.updateTodo = function ($event) {
            if(this.todo.newstatusId){
                this.todo.statusId = Number(this.todo.newstatusId);
                this.todo.status = this.columns[this.todo.statusId].name;
            }
             todoService.updateTodo(this.todo);

            if($rootScope.previousState.name){
                $state.go($rootScope.previousState.name)
            }

        };

      /*  this.selectChanged = (column,todo) => {
            todoService.updateData(column,todo,$scope.columns[Number(column)].name);
        };*/
    }]);

app.directive('mydatepicker', function () {
    return {
        restrict: 'A',
        // require: 'ngModel',
        // controller:'EditTodoController',
        // controllerAs:"editCtrl",
        link: function (scope, element, attrs, ngModelCtrl) {
            element.datepicker({
                minDate: new Date()
            });
        }
    };
});