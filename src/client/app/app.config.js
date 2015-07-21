angular
    .module('app')
    .factory('authInterceptor', authInterceptor)
    .config(conf);

authInterceptor.$inject = ['auth'];
/* @ngInject */
function authInterceptor(auth) {//$q
    return {

        'request': function (config) {
            // do something on success
            if (auth.isLoggedIn()) {
                config.headers['x-access-token'] = 'Bearer ' + auth.getToken();
            }

            return config;
        },

        'requestError': function (rejection) {
            // do something on error
            //if (canRecover(rejection)) {
            //    return responseOrNewPromise
            //}
            return rejection;//$q(rejection)
        },

        'response': function (response) {
            // do something on success
            if (response.data.token) {
                auth.saveToken(response.data.token);
            }

            return response;
        },

        'responseError': function (rejection) {
            // do something on error
            //if (canRecover(rejection)) {
            //    return responseOrNewPromise
            //}
            return rejection;//$q(rejection)
        }

    };
}


conf.$inject = ['$httpProvider'];
/* @ngInject */
function conf($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
}
