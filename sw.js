this.addEventListener('install', function(event) {
event.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll([
                '/index.html',
                '/css/style.css',
                '/form/addTodoDirective.js',
                '/form/form.js',
                '/form/form-template.html',
                '/templates/editTodo-template.html',
                '/templates/filteredColumn-template.html',
                '/templates/oneColumn-template.html',
                '/templates/oneTodo.html',
                '/app.js',
                '/controllers/ColumnController.js',
                '/config.js',
                '/directives/directives.js',
                '/controllers/EditTodoController.js',
                '/controllers/ListController.js',
                '/filters/stateFilter.js',
                '/controllers/TodoController.js',
                '/services/services.js'
            ]);
        })
    );
});