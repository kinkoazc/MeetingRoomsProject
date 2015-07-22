(function () {
    'use strict';

    angular
        .module('app.rooms')
        .controller('RoomsController', RoomsController);

    RoomsController.$inject = ['$rootScope', '$state', '$window',
        '$filter', '$timeout', 'auth', 'logger', 'routerHelper', 'dataservice', 'formatservice'];
    /* @ngInject */
    /*jshint maxparams: 15 */
    function RoomsController($rootScope, $state, $window,
        $filter, $timeout, auth, logger, routerHelper, dataservice, formatservice) {

        var vm = this,
            states = routerHelper.getStates();
        vm.deleteRoom = deleteRoom;
        vm.isCurrent = isCurrent;
        //vm.rooms = [];
        //vm.room = {};
        vm.navRoutes = [];
        vm.sendAddForm = sendAddForm;
        vm.sendEditForm = sendEditForm;
        vm.title = 'Rooms';
        //vm.user = {};

        activate();

        function activate() {
            logger.info('Activated Rooms View');

            $rootScope.$on('$stateChangeSuccess', function () {
                //console.log('state changed successfully');

                //if ($state.params.id) {
                //    for (var i = 0; i < vm.rooms.length; i++) {
                //        if ($state.params.id === vm.rooms[i].id + '') {
                //            vm.room = vm.rooms[i];
                //        }
                //    }
                //
                //    if (angular.equals({}, vm.room)) {
                //        $state.go('rooms.list');
                //    }
                //}

                //if (angular.equals({}, vm.room)) {
                //    vm.room=room;
                //}
            });

            $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
                getNavRoutes(toState);

                if (fromParams && fromParams.id && !toParams.id) {
                    toParams.id = fromParams.id;
                }

            });

            getNavRoutes();
            //vm.rooms = formatservice.formatRoomsList(rooms);
            //vm.user = auth.currentUser();
        }

        function getNavRoutes(toState) {
            var current = toState || $state.current;

            if (!angular.isObject(current) || current.name.indexOf('rooms.') > -1 &&
                current.url.indexOf(':id') === -1) {
                getRoomsNavRoutes();
            } else if (angular.isObject(current) && current.name.indexOf('rooms.') > -1 &&
                current.url.indexOf(':id') > -1) {
                getRoomNavRoutes();
            }
        }

        function getRoomsNavRoutes() {
            vm.navRoutes = states.filter(function (r) {
                return (r.name.indexOf('rooms.') === 0 && r.url.indexOf(':id') === -1);
            });
        }

        function getRoomNavRoutes() {
            vm.navRoutes = states.filter(function (r) {
                return (r.name.indexOf('rooms.') === 0 && r.url.indexOf(':id') > -1);
            });
        }

        function isCurrent(route) {
            if (!route.title || !$state.current || !$state.current.title) {
                return '';
            }

            var menuName = route.title;
            return $state.current.title.substr(0, menuName.length) === menuName ? 'active' : '';
        }

        //function getRooms() {
        //    vm.rooms = [
        //        {
        //            description: "Scrum room",
        //            who: "User One",
        //            when: "17.07.2015, 11:00-12:50",
        //            duration: "1h 50min",
        //            where: "Room 45",
        //            allowed: "User One, User Three",
        //            id: 1231241
        //        },
        //        {
        //            description: "Investors room",
        //            who: "User Three",
        //            when: "17.07.2015, 13:00-15:50",
        //            duration: "2h 50min",
        //            where: "Room 30",
        //            allowed: "User Three",
        //            id: 1231256
        //        }
        //    ];
        //}

        function sendEditForm(e, room, cb) {
            e.preventDefault();

            //console.log('Edit room form submitted! ', room);
            dataservice.editingRoom(formatservice.formatRoomEditOut(room)).$promise.then(function (data) {
                if (data.message==='Not authorized.') {
                    logger.error('You are not authorized to edit this room.', data, 'Error!');
                } else {
                    logger.success('Room updated successfully.', data, 'Success!');
                }

                // reset the form
                cb();
                //e.target.reset();
            }, function (reason) {
                logger.error('Room not updated.', reason, 'Error!');
            });

            return false;
        }

        function sendAddForm(e, room, cb) {
            e.preventDefault();

            //console.log('Add room form submitted! ', formatservice.formatRoomAddOut(room));
            dataservice.addingRoom(formatservice.formatRoomAddOut(room)).$promise.then(function (data) {
                logger.success('Room saved successfully.', data, 'Success!');

                // reset the form
                cb();
                //e.target.reset();
            }, function (reason) {
                logger.error('Room not saved.', reason, 'Error!');
            });

            return false;
        }

        function deleteRoom(id) {
            if ($window.confirm('Are you sure you want to delete the entry?')) {
                dataservice.deletingRoom(id).$promise.then(function (data) {
                    if (data.message==='Not authorized.') {
                        logger.error('You are not authorized to delete this room.', data, 'Error!');
                    } else {
                        logger.success('Room deleted successfully.', data, 'Success!');
                    }


                    if ($state.is('rooms.list')) {
                        $state.reload();
                    } else {
                        $state.go('rooms.list');
                    }
                }, function (reason) {
                    logger.error('Room not deleted.', reason, 'Error!');
                });
            }
        }
    }
})();
