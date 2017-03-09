var app = require('../app.js');

app.directive('todoFilters', function () {
    return {
        template:require('../Templates/filters-template.html')
    };
});

