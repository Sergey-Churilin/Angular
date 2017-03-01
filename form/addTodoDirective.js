app.directive('addTodo',function () {
    return {
        controller:'FormController',
        controllerAs:"formCtrl",
        templateUrl: "form/form-template.html",
    }
});