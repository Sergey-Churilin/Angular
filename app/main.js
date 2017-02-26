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