(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q', '$state', '$resource', 'Meeting', 'Room', 'User', 'logger'];
    /* @ngInject */
    function dataservice($http, $q, $state, $resource, Meeting, Room, User, logger) {
        return {
            logging: logging,
            registering: registering,
            gettingMeetings: gettingMeetings,
            gettingMeeting: gettingMeeting,
            addingMeeting: addingMeeting,
            editingMeeting: editingMeeting,
            deletingMeeting: deletingMeeting,

            gettingRooms: gettingRooms,
            gettingRoomsStatus: gettingRoomsStatus,
            gettingRoom: gettingRoom,
            addingRoom: addingRoom,
            editingRoom: editingRoom,
            deletingRoom: deletingRoom,

            gettingUsers: gettingUsers,
            gettingUser: gettingUser,
            addingUser: addingUser,
            editingUser: editingUser,
            deletingUser: deletingUser
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
        function logging(user) {
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
            var meetings = Meeting.resource.query();

            meetings.$promise.then(function (data) {
                //Meeting.setMeeting(data);

                return data;
            });

            return meetings;
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

        /* GET ONE */
        function gettingMeeting(id) {
            var meeting = Meeting.resource.get({id: id});

            meeting.$promise.then(function (data) {
                //Meeting.setMeeting(data);

                return data;
            });

            return meeting;
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
        function addingMeeting(mtg) {
            var meeting = Meeting.resource.save(mtg);

            meeting.$promise.then(function (data) {
                //gettingMeetings();

                return data;
            });

            return meeting;
        }

        /* PUT */
        function editingMeeting(mtg) {
            var meeting = Meeting.resource.update({id: $state.params.id}, mtg);

            meeting.$promise.then(function (data) {
                //Meeting.setMeeting(data);
                //gettingMeetings();

                return data;
            });

            return meeting;
        }

        /* DELETE */
        function deletingMeeting(i) {
            var id = i || $state.params.id,
                meeting = Meeting.resource.delete({id: id});

            meeting.$promise.then(function (data) {
                //gettingMeetings();

                return data;
            });

            return meeting;
        }

        /* ROOMS */
        /* GET ALL */
        function gettingRooms() {
            var room = Room.resource.query();

            room.$promise.then(function (data) {
                //Room.setRoom(data);

                return data;
            });

            return room;
            //$http
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

        /* GET ALL with STATUSES */
        function gettingRoomsStatus() {
            var room = $resource('/api/room-status').query();//$http.get('/api/room-status');

            room.$promise.then(function (data) {
                //Room.setRoom(data);

                return data;
            });

            return room;
            //$http
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

        /* GET ONE */
        function gettingRoom(id) {
            var room = Room.resource.get({id: id});

            room.$promise.then(function (data) {
                //Room.setRoom(data);

                return data;
            });

            return room;
            //$http
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

        /* POST */
        function addingRoom(mtg) {
            var room = Room.resource.save(mtg);

            room.$promise.then(function (data) {
                //gettingRooms();

                return data;
            });

            return room;
        }

        /* PUT */
        function editingRoom(mtg) {
            var room = Room.resource.update({id: $state.params.id}, mtg);

            room.$promise.then(function (data) {
                //Room.setRoom(data);
                //gettingRooms();

                return data;
            });

            return room;
        }

        /* DELETE */
        function deletingRoom(i) {
            var id = i || $state.params.id,
                room = Room.resource.delete({id: id});

            room.$promise.then(function (data) {
                //gettingRooms();

                return data;
            });

            return room;
        }

        /* USERS */
        /* GET ALL */
        function gettingUsers() {
            var user = User.resource.query();

            user.$promise.then(function (data) {
                //User.setUser(data);

                return data;
            });

            return user;
            //$http
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

        /* GET ONE */
        function gettingUser(id) {
            var user = User.resource.get({id: id});

            user.$promise.then(function (data) {
                //User.setUser(data);

                return data;
            });

            return user;
            //$http
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

        /* POST */
        function addingUser(mtg) {
            var user = User.resource.save(mtg);

            user.$promise.then(function (data) {
                //gettingUsers();

                return data;
            });

            return user;
        }

        /* PUT */
        function editingUser(mtg) {
            var user = User.resource.update({id: $state.params.id}, mtg);

            user.$promise.then(function (data) {
                //User.setUser(data);
                //gettingUsers();

                return data;
            });

            return user;
        }

        /* DELETE */
        function deletingUser(i) {
            var id = i || $state.params.id,
                user = User.resource.delete({id: id});

            user.$promise.then(function (data) {
                //gettingUsers();

                return data;
            });

            return user;
        }

    }
})();
