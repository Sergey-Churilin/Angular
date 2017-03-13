const app = require('../app.js');

app.controller('AuthController', ['authService', 'md5', function (authService, md5) {
    this.show = false;
    this.loginUser = ($event) => {
        $event.preventDefault();
        if (this.user && this.user.login.length > 0 && this.user.password && this.user.password.length > 0) {
            authService.loginUser({
                "login": this.user.login,
                "pass": md5.createHash(this.user.password),
                'remember': this.user.remember
            }, (response) => {
                if (response) {
                    this.responseText = response.data;
                    this.show = true;
                }
            });
        }
    };

    this.createNewUser = ($event) => {
        $event.preventDefault();
        if (this.user && this.user.login.length > 0 && this.user.password && this.user.password.length > 0) {
            authService.createNewUser({
                "login": this.user.login,
                "pass": md5.createHash(this.user.password),
                'remember': this.user.remember
            }, (response) => {
                if (response) {
                    this.responseText = response.data;
                    this.show = true;
                }
            });
        }
    }
}]);