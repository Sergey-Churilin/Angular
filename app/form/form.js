app.controller('FormController',['todoService',function (todoService) {
    this.addTodo = function ($event) {
        $event.preventDefault();
        this.todo.status = 'todo';
        this.todo.isChecked = false;
        this.todo.statusId = 0;
        this.todo.isUrgent = this.todo.isUrgent || false;
        this.todo.photo='https://2.gravatar.com/avatar/50d10a8864accf0b2522c326381a4702?d=https%3A%2F%2Fidenticons.github.com%2F02e74f10e0327ad868d138f2b4fdd6f0.png&r=x';
        this.todo.id = Date.now();
        todoService.addTodo(this.todo);
        this.todo = {};
    };
}])
