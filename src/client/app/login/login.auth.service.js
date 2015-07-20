(function () {

    'use strict';

    angular
        .module('app.login')
        .factory('auth', Auth);

    Auth.$inject = ['$window'];//'$http',

    /* @ngInject */
    function Auth($window) {//$http,
        var auth = {};

        auth.saveToken = function saveToken(token) {
            $window.localStorage['meetings-auth-token'] = token;
        };

        auth.getToken = function getToken() {
            return $window.localStorage['meetings-auth-token'];
        };

        auth.isLoggedIn = function isLoggedIn() {
            var token = auth.getToken();

            if (token) {
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        auth.currentUser = function currentUser() {
            if (auth.isLoggedIn()) {
                var token = auth.getToken(),
                    payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload;//payload.username
            }
        };

        auth.register = function register(user) {
            //return $http.post('/register', user).success(function (data) {
            //    auth.saveToken(data.token);
            //});
        };

        //auth.logIn = function(user){
        //    return $http.post('/login', user).success(function(data){
        //        auth.saveToken(data.token);
        //    });
        //};

        auth.logOut = function logOut() {
            $window.localStorage.removeItem('meetings-auth-token');
        };

        return auth;
    }

})();




