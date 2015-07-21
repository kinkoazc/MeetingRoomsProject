(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q', '$state', 'Meeting', 'Room', 'User', 'logger'];
    /* @ngInject */
    function dataservice($http, $q, $state, Meeting, Room, User, logger) {
        return {
            loging: loging,
            registering: registering,
            gettingMeetings: gettingMeetings,
            addingMeeting: addingMeeting,
            editingMeeting: editingMeeting,
            gettingRooms: gettingRooms,
            gettingUsers: gettingUsers
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

        /* USER */
        function loging(user) {
            return $http
                .post('/api/authenticate', user)
                .then(function (results) {
                    var msg = '', data = results.data;

                    if (data.success === true) {
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


        function registering(user) {
            return $http
                .post('/api/register', user)
                .then(function (results) {
                    var msg = '', data = results.data;

                    if (data.success === true) {
                        msg = 'User was registered successfully. Hello ' + data.email;
                        logger.success(msg);
                    } else {
                        msg = 'Registering failed. ' + data.message;
                        logger.error(msg);
                    }

                    return data;
                }).catch(function (reason) {
                    var msg = 'Registering failed. ' + reason.data.description;
                    logger.error(msg);

                    return reason;
                });
        }


        /* MEETINGS */
        /* GET ALL */
        function gettingMeetings() {
            return Meeting.query();

            //$http
            //    .get('/api/meetings')
            //    .then(function (results) {
            //        var msg = '', data = results.data;
            //
            //        if (results.status === 200) {
            //            msg = 'Meetings received successfully!';
            //            logger.success(msg);
            //            return data;
            //        } else {
            //            msg = 'Meetings getting failed. ' + data.message;
            //            logger.error(msg);
            //        }
            //
            //        return data;
            //    }).catch(function (reason) {
            //        var msg = 'Meetings getting failed. ' + reason.data.description;
            //        logger.error(msg);
            //
            //        return reason;
            //    });
        }

        /* POST */
        function addingMeeting(meeting) {
            return Meeting.save(meeting);
        }

        /* PUT */
        function editingMeeting(meeting) {
            return Meeting.update({id: $state.params.id}, meeting);
        }

        /* ROOMS */
        function gettingRooms() {
            return Room.query();

            //return $http
            //    .get('/api/rooms')
            //    .then(function (results) {
            //        var msg = '', data = results.data;
            //
            //        if (results.status === 200) {
            //            msg = 'Rooms received successfully!';
            //            logger.success(msg);
            //            return data;
            //        } else {
            //            msg = 'Rooms getting failed. ' + data.message;
            //            logger.error(msg);
            //        }
            //
            //        return data;
            //    }).catch(function (reason) {
            //        var msg = 'Rooms getting failed. ' + reason.data.description;
            //        logger.error(msg);
            //
            //        return reason;
            //    });
        }

        /* USERS */
        function gettingUsers() {
            return User.query();

            //return $http
            //    .get('/api/users')
            //    .then(function (results) {
            //        var msg = '', data = results.data;
            //
            //        if (results.status === 200) {
            //            msg = 'Users received successfully!';
            //            logger.success(msg);
            //            return data;
            //        } else {
            //            msg = 'Users getting failed. ' + data.message;
            //            logger.error(msg);
            //        }
            //
            //        return data;
            //    }).catch(function (reason) {
            //        var msg = 'Users getting failed. ' + reason.data.description;
            //        logger.error(msg);
            //
            //        return reason;
            //    });
        }

    }
})();
