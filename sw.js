this.addEventListener('install', function(event) {
event.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll([
                '/index.html',
                '/css/style.css',
                '/AddTodo/addTodoDirective.js',
                '/AddTodo/AddTodoController.js',
                '/AddTodo/add-todo-template.html',
                '/templates/editTodo-template.html',
                '/templates/filteredColumn-template.html',
                '/templates/oneColumn-template.html',
                '/templates/oneTodo.html',
                '/app.js',
                '/TodoController/ColumnController.js',
                '/config.js',
                '/directives/directives.js',
                '/TodoController/EditTodoController.js',
                '/TodoController/ListController.js',
                '/filters/stateFilter.js',
                '/TodoController/TodoController.js',
                '/services/services.js'
            ]);
        })
    );
});