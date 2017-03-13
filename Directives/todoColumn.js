const app = require('../app.js');

app.directive('todoColumn', function () {
    return {
        template:require('../Templates/column-template.html')
    };
});
