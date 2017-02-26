app.controller('EditTodoController', ['$stateParams','$state','todoService','columnsService',
    function ($stateParams,$state, todoService,columnsService) {
        console.log($state)
        this.todo = todoService.getTodo($stateParams.id);

        if(!this.title){
            todoService.getAllTodos((data) => {
                this.todo = todoService.getTodo(Number($stateParams.id));
            });
        }
       this.updateTodo = function ($event) {
            todoService.updateTodo(this.todo);
        };

    }]);