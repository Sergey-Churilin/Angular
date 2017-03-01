app.filter('stateFilter', function () {
    return function (list, index) {
        if (list.statusId === index)
            return list;
    }
});