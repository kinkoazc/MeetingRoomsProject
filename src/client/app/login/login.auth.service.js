;
(function () {

    "use strict";

    angular
        .module('app.login')
        .factory('auth', Auth);

    Auth.$inject = ['$window'];//'$http',

    /* @ngInject */
    function Auth($window) {//$http,
        var auth = {};

        auth.saveToken = function (token) {
            $window.localStorage['meetings-auth-token'] = token;
        };

        auth.getToken = function () {
            return $window.localStorage['meetings-auth-token'];
        };

        auth.isLoggedIn = function () {
            var token = auth.getToken();

            if (token) {
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        auth.currentUser = function () {
            if (auth.isLoggedIn()) {
                var token = auth.getToken(),
                    payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload;//payload.username
            }
        };

        auth.register = function (user) {
            //return $http.post('/register', user).success(function (data) {
            //    auth.saveToken(data.token);
            //});
        };

        //auth.logIn = function(user){
        //    return $http.post('/login', user).success(function(data){
        //        auth.saveToken(data.token);
        //    });
        //};

        auth.logOut = function () {
            $window.localStorage.removeItem('meetings-auth-token');
        };

        return auth;
    }

})();




