const app = require('../app.js');

app.directive('mydatepicker', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs, ngModelCtrl) {
            element.datepicker({
                minDate: new Date(),
                dateFormat: 'dd-mm-yy'
            });
        }
    };
});