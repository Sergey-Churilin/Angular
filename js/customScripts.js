$(document).ready(function () {
    $('.navbar li').click(function () {
        $('.navbar li').removeClass('active');
        $(this).addClass('active');
    });
});