const app = require('../app.js');

app.controller('EditTodoController', ['$stateParams', '$state', '$rootScope', 'todoService', 'columnsService',
    function ($stateParams, $state, $rootScope, todoService,columnsService) {
        this.todo = todoService.getTodo($stateParams.id);
        // this.column = $scope.todo.statusId.toString();
        this.columns = columnsService.getColumns();
        this.statusId = '0';
        if (!this.todo) {
            todoService.getAllTodos((data) => {
                this.todo = todoService.getTodo(Number($stateParams.id));
                this.statusId = this.todo.statusId.toString();
                console.log('newStatusId = '+this.statusId);
            });
        }

        this.updateTodo = function ($event) {
            this.todo.statusId = Number(this.statusId);
            this.todo.status = this.columns[Number(this.statusId)].name;
            todoService.updateTodo(this.todo);

            if($rootScope.previousState.name){
                $state.go($rootScope.previousState.name)
            }
        };

        this.cancelEditing = function () {
            $state.go($rootScope.previousState.name);
        }
    }]);