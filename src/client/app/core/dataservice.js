(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q', '$state', 'logger'];
    /* @ngInject */
    function dataservice($http, $q, $state, logger) {
        return {
            //getPeople: getPeople,
            //getMessageCount: getMessageCount
            login: login
        };

        //function getMessageCount() {
        //    return $q.when(72);
        //}
        //
        //function getPeople() {
        //    return $http.get('/api/people')
        //        .then(success)
        //        .catch(fail);
        //
        //    function success(response) {
        //        return response.data;
        //    }
        //
        //    function fail(error) {
        //        var msg = 'query for people failed. ' + error.data.description;
        //        logger.error(msg);
        //        return $q.reject(msg);
        //    }
        //}

        function login(user) {
            return $http
                .post('/api/authenticate', user)
                .then(function (data) {
                    var msg='', data=data.data;

                    if (data.success===true) {
                        msg = 'Login successful. Hello ' + data.email;
                        logger.success(msg);
                    } else {
                        msg = 'Login failed.';
                        logger.error(msg);
                    }

                    return data;
                }).catch(function (reason) {
                    var msg = 'Login failed. ' + reason.data.description;
                    logger.error(msg);

                    return reason;
                });
        }

    }
})();
