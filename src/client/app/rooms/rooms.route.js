(function () {
    'use strict';

    angular
        .module('app.rooms')
        .run(appRun);

    appRun.$inject = ['$q', '$stateParams', '$timeout', '$state', 'dataservice', 'routerHelper', 'formatservice'];
    /* @ngInject */
    function appRun($q, $stateParams, $timeout, $state, dataservice, routerHelper, formatservice) {
        routerHelper.configureStates(getStates($q, $stateParams,
            $timeout, $state, dataservice, formatservice));//, null, ['/rooms', '/rooms/list']
    }

    function getStates($q, $stateParams, $timeout, $state, dataservice, formatservice) {
        return [
            {
                state: 'rooms',
                config: {
                    url: '/rooms',
                    templateUrl: 'app/rooms/rooms.html',
                    controller: 'RoomsController',
                    controllerAs: 'vm',
                    title: 'Rooms',
                    abstract: true,
                    settings: {
                        nav: 1,
                        //inMainMenu: true,
                        content: '<i class="fa fa-briefcase"></i> Rooms'
                    }
                    //onEnter: function ($state) {
                    //    console.log('entering rooms');
                    //    $state.go('rooms.list');
                    //},
                    //onExit: function () {
                    //    console.log('exiting rooms');
                    //},
                    //resolve: {
                    //    rooms: function () {
                    //        //console.log('resolve rooms');
                    //        //var rooms = [
                    //        //    {
                    //        //        description: 'Scrum room',
                    //        //        who: 'User One',
                    //        //        when: 1488323623006,
                    //        //        duration: 6600000,
                    //        //        where: 'Room 45',
                    //        //        allowed: 'User One, User Three',
                    //        //        id: 1231241
                    //        //    },
                    //        //    {
                    //        //        description: 'Investors room',
                    //        //        who: 'User Three',
                    //        //        when: 1498323623006,
                    //        //        duration: 10200000,
                    //        //        where: 'Room 30',
                    //        //        allowed: 'User Three',
                    //        //        id: 1231256
                    //        //    }
                    //        //];
                    //        //
                    //        //var deferred=$q.defer();
                    //        //
                    //        //$timeout(function () {
                    //        //    deferred.resolve(rooms);
                    //        //}, 100);
                    //        //
                    //        //return deferred.promise;//$q.when(rooms);
                    //
                    //        return dataservice.gettingRooms();
                    //
                    //    }
                    //,
                    //room: function ($stateParams) {
                    //    if ($stateParams.id) {
                    //        return this.rooms().when(
                    //            function (data) {
                    //                for (var i = 0; i < data.length; i++) {
                    //                    if ($stateParams.id == data[i].id + '") {
                    //                        return data[i];
                    //                    }
                    //                }
                    //
                    //                return {};
                    //            }
                    //        )
                    //    } else {
                    //        return {};
                    //    }
                    //}
                    //}
                }
            },
            {
                state: 'rooms.list',
                config: {
                    url: '/list',
                    templateUrl: 'app/rooms/rooms.mru.list.html',
                    title: 'Rooms list',
                    settings: {
                        authLevel: 3
                    },
                    resolve: {
                        rooms: function () {
                            //console.log('resolve rooms');
                            //var rooms = [
                            //    {
                            //        description: 'Scrum room',
                            //        who: 'User One',
                            //        when: 1488323623006,
                            //        duration: 6600000,
                            //        where: 'Room 45',
                            //        allowed: 'User One, User Three',
                            //        id: 1231241
                            //    },
                            //    {
                            //        description: 'Investors room',
                            //        who: 'User Three',
                            //        when: 1498323623006,
                            //        duration: 10200000,
                            //        where: 'Room 30',
                            //        allowed: 'User Three',
                            //        id: 1231256
                            //    }
                            //];
                            //
                            //var deferred=$q.defer();
                            //
                            //$timeout(function () {
                            //    deferred.resolve(rooms);
                            //}, 100);
                            //
                            //return deferred.promise;//$q.when(rooms);

                            return dataservice.gettingRooms();

                        }
                        //,
                        //room: function ($stateParams) {
                        //    if ($stateParams.id) {
                        //        return this.rooms().when(
                        //            function (data) {
                        //                for (var i = 0; i < data.length; i++) {
                        //                    if ($stateParams.id == data[i].id + '") {
                        //                        return data[i];
                        //                    }
                        //                }
                        //
                        //                return {};
                        //            }
                        //        )
                        //    } else {
                        //        return {};
                        //    }
                        //}
                    },
                    controller: ['$scope', 'rooms', function ($scope, rooms) {
                        var vml = this, scope = $scope;

                        vml.rooms = [];
                        rooms.$promise.then(function (data) {
                            //$scope.$parent.vm.rooms
                            vml.rooms = formatservice.formatRoomsList(data);
                            scope.$parent.vm.rooms = vml.rooms;
                        });

                    }],
                    controllerAs: 'vml'
                }
            },
            {
                state: 'rooms.status',
                config: {
                    url: '/status',
                    templateUrl: 'app/rooms/rooms.mru.status.html',
                    title: 'Rooms status',
                    settings: {
                        nav: 2,
                        inMainMenu: true,
                        authLevel: 1,
                        content: '<i class="fa fa-briefcase"></i> Rooms'
                    },
                    resolve: {
                        roomsStatus: function () {
                            //console.log('resolve rooms');
                            //var rooms = [
                            //    {
                            //        description: 'Scrum room',
                            //        who: 'User One',
                            //        when: 1488323623006,
                            //        duration: 6600000,
                            //        where: 'Room 45',
                            //        allowed: 'User One, User Three',
                            //        id: 1231241
                            //    },
                            //    {
                            //        description: 'Investors room',
                            //        who: 'User Three',
                            //        when: 1498323623006,
                            //        duration: 10200000,
                            //        where: 'Room 30',
                            //        allowed: 'User Three',
                            //        id: 1231256
                            //    }
                            //];
                            //
                            //var deferred=$q.defer();
                            //
                            //$timeout(function () {
                            //    deferred.resolve(rooms);
                            //}, 100);
                            //
                            //return deferred.promise;//$q.when(rooms);

                            return dataservice.gettingRoomsStatus();

                        }
                        //,
                        //room: function ($stateParams) {
                        //    if ($stateParams.id) {
                        //        return this.rooms().when(
                        //            function (data) {
                        //                for (var i = 0; i < data.length; i++) {
                        //                    if ($stateParams.id == data[i].id + '") {
                        //                        return data[i];
                        //                    }
                        //                }
                        //
                        //                return {};
                        //            }
                        //        )
                        //    } else {
                        //        return {};
                        //    }
                        //}
                    },
                    controller: ['$scope', '$interval', 'roomsStatus', function ($scope, $interval, roomsStatus) {
                        var vms = this;

                        vms.roomsStatus = [];
                        roomsStatus.$promise.then(function (data) {
                            vms.roomsStatus = formatservice.formatRoomsStatusList(data);
                        });
                        vms.checkIfAvailable = checkIfAvailable;

                        function checkIfAvailable(rm, arr) {
                            rm.rez = false;

                            (function (rm, arr) {
                                if (!rm.interval) {

                                    //rm.interval = $interval(checkIfAvailableInterval.bind(null, rm, arr), 5000);

                                    $timeout(function () {
                                        checkIfAvailableInterval(rm, arr);
                                    });

                                    rm.interval = $interval(checkIfAvailableInterval.bind(null, rm, arr), 5000);
                                }
                            })(rm, arr);
                        }

                        function checkIfAvailableInterval(rm, arr) {
                            //console.log('----- checking if room is available');

                            var now = +new Date();
                            for (var i = 0; i < arr.length; i++) {
                                if (now >= arr[i].start && now <= arr[i].end) {
                                    rm.rez = false;
                                    return false;
                                }
                            }

                            rm.rez = true;
                            return true;
                        }

                        $scope.$on('$destroy', function () {
                            for (var i = 0; i < vms.roomsStatus.length; i++) {
                                if (vms.roomsStatus[i].interval) {
                                    $interval.cancel(vms.roomsStatus[i].interval);
                                }
                            }
                        });

                    }],
                    controllerAs: 'vms'
                }
            },
            {
                state: 'rooms.add',
                config: {
                    url: '/add',
                    templateUrl: 'app/rooms/rooms.mru.add.html',
                    title: 'Room add',
                    //resolve: {
                    //    users: function () {
                    //
                    //        //if ($stateParams.id) {
                    //        //    for (var i = 0; i < rooms.length; i++) {
                    //        //        if ($stateParams.id === rooms[i]._id) {
                    //        //            return formatservice.formatRoomDetails(rooms[i]);
                    //        //        }
                    //        //    }
                    //        //}
                    //
                    //        return dataservice.gettingUsers();
                    //    },
                    //    rooms: function () {
                    //
                    //        //if ($stateParams.id) {
                    //        //    for (var i = 0; i < rooms.length; i++) {
                    //        //        if ($stateParams.id === rooms[i]._id) {
                    //        //            return formatservice.formatRoomDetails(rooms[i]);
                    //        //        }
                    //        //    }
                    //        //}
                    //
                    //        return dataservice.gettingRooms();
                    //    }
                    //},
                    controller: ['$state', 'auth', function ($state, auth) {
                        var vma = this;

                        vma.addRoomFormCb = addRoomFormCb;

                        /* TODO erase/comment this; for testing purposes only */
                        vma.room = {};
                        vma.room.name = 'Room ' + Math.round(Math.random() * 10000);
                        vma.room.location = Math.round(Math.random() * 15) + 'th Floor, Europe House';
                        vma.room.size = Math.round(Math.random() * 100);
                        vma.room.hasConferenceEquipment = Math.round(Math.random()) ? true : false;
                        vma.room.hasVideoProjector = Math.round(Math.random()) ? true : false;

                        function addRoomFormCb() {
                            vma.room = {};
                            $state.go('rooms.list');
                        }
                    }],
                    controllerAs: 'vma',
                    settings: {
                        authLevel: 3
                    }
                }
            },
            {
                state: 'rooms.details',
                config: {
                    url: '/details/:id',
                    templateUrl: 'app/rooms/rooms.mru.details.html',
                    title: 'Room details',
                    resolve: {
                        room: function ($stateParams, formatservice) {//rooms,
                            if ($stateParams.id) {

                                //get only one room
                                return dataservice.gettingRoom($stateParams.id);

                                //return rooms.$promise.then(function (data) {
                                //    for (var i = 0; i < data.length; i++) {
                                //        if ($stateParams.id === data[i]._id) {
                                //            return formatservice.formatRoomDetails(data[i]);
                                //        }
                                //    }
                                //});
                            }
                        }
                    },
                    controller: ['$scope', 'room', function ($scope, room) {
                        var vmd = this;

                        room.$promise.then(function (data) {
                            vmd.room = formatservice.formatRoomDetails(data);
                        });

                    }],
                    controllerAs: 'vmd',
                    settings: {
                        authLevel: 3
                    }
                }
            },
            {
                state: 'rooms.edit',
                config: {
                    url: '/edit/:id',
                    templateUrl: 'app/rooms/rooms.mru.edit.html',
                    title: 'Room edit',
                    resolve: {
                        room: function ($stateParams, formatservice) {
                            if ($stateParams.id) {

                                //return rooms.$promise.then(function (data) {
                                //    for (var i = 0; i < data.length; i++) {
                                //        if ($stateParams.id === data[i]._id) {
                                //            return formatservice.formatRoomEditIn(data[i]);
                                //        }
                                //    }
                                //});

                                //get only one room
                                return dataservice.gettingRoom($stateParams.id);

                            }
                        }
                        //users: function () {
                        //    //if ($stateParams.id) {
                        //    //    for (var i = 0; i < rooms.length; i++) {
                        //    //        if ($stateParams.id === rooms[i]._id) {
                        //    //            return formatservice.formatRoomDetails(rooms[i]);
                        //    //        }
                        //    //    }
                        //    //}
                        //
                        //    return dataservice.gettingUsers();
                        //},
                        //rooms: function () {
                        //    //if ($stateParams.id) {
                        //    //    for (var i = 0; i < rooms.length; i++) {
                        //    //        if ($stateParams.id === rooms[i]._id) {
                        //    //            return formatservice.formatRoomDetails(rooms[i]);
                        //    //        }
                        //    //    }
                        //    //}
                        //
                        //    return dataservice.gettingRooms();
                        //}
                    },
                    controller: ['$scope', '$state', 'room',
                        function ($scope, $state, room) {//, users, rooms
                            var vme = this;

                            vme.editRoomFormCb = editRoomFormCb;

                            room.$promise.then(function (data) {
                                vme.room = formatservice.formatRoomEditIn(data);
                            });

                            //vme.room = room;
                            //vme.users = users;
                            //vme.rooms = rooms;

                            function editRoomFormCb() {
                                //$state.reload();
                                $state.go('rooms.details');
                                //var who = angular.copy(vme.room.who);
                                //vme.room = {};
                                //vme.room.who = who;
                            }
                        }],
                    controllerAs: 'vme',
                    settings: {
                        authLevel: 3
                    }
                }
            }
        ];
    }
})();
