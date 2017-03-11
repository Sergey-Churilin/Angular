var app = require('../app.js');

app.controller('AddTodoController',['$state','$rootScope','todoService',function ($state,$rootScope,todoService) {
    // this.enabled =  (this.todo && this.todo.title) !='';

    this.isDisabledDate = function(currentDate, mode) {
        return mode === 'day' && (currentDate.getDay() === 0 || currentDate.getDay() === 6);
    };

    this.addTodo = function ($event) {
        $event.preventDefault();
        this.todo.status = 'todo';
        this.todo.isChecked = false;
        this.todo.statusId = 0;
        this.todo.isUrgent = this.todo.isUrgent || false;
        this.todo.photo='https://2.gravatar.com/avatar/50d10a8864accf0b2522c326381a4702?d=https%3A%2F%2Fidenticons.github.com%2F02e74f10e0327ad868d138f2b4fdd6f0.png&r=x';
        this.todo.id = Date.now();
        const parts = this.todo.deadline.split('-');
        const timestamp = new Date(parts[2],parts[1]-1,parts[0]).getTime();
        this.todo.deadlineTimestamp = timestamp;
        todoService.addTodo(this.todo);
        this.todo = {};
        $state.go($rootScope.previousState.name)
    };
}]);

/*app.directive('addTodo',function () {
    return {
        controller:'AddTodoController',
        controllerAs:"addTodoCtrl",
        template: require("./add-todo-template.html")
    }
});*/