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
                    },
                    //onEnter: function ($state) {
                    //    console.log('entering rooms');
                    //    $state.go('rooms.list');
                    //},
                    //onExit: function () {
                    //    console.log('exiting rooms');
                    //},
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
                    }
                }
            },
            {
                state: 'rooms.list',
                config: {
                    url: '/list',
                    templateUrl: 'app/rooms/rooms.mru.list.html',
                    title: 'Rooms list',
                    settings: {
                        nav: 2,
                        inMainMenu: true,
                        authLevel: 3,
                        content: '<i class="fa fa-briefcase"></i> Rooms'
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
                        var vml = this;

                        vml.rooms = [];
                        rooms.$promise.then(function (data) {
                            //$scope.$parent.vm.rooms
                            vml.rooms= formatservice.formatRoomsList(data);
                        });

                    }],
                    controllerAs: 'vml'
                }
            },
            {
                state: 'rooms.add',
                config: {
                    url: '/add',
                    templateUrl: 'app/rooms/rooms.mru.add.html',
                    title: 'Rooms add',
                    resolve: {
                        users: function () {

                            //if ($stateParams.id) {
                            //    for (var i = 0; i < rooms.length; i++) {
                            //        if ($stateParams.id === rooms[i]._id) {
                            //            return formatservice.formatRoomDetails(rooms[i]);
                            //        }
                            //    }
                            //}

                            return dataservice.gettingUsers();
                        },
                        rooms: function () {

                            //if ($stateParams.id) {
                            //    for (var i = 0; i < rooms.length; i++) {
                            //        if ($stateParams.id === rooms[i]._id) {
                            //            return formatservice.formatRoomDetails(rooms[i]);
                            //        }
                            //    }
                            //}

                            return dataservice.gettingRooms();
                        }
                    },
                    controller: ['users', 'rooms', 'auth', function (users, rooms, auth) {
                        var vma = this;

                        vma.users = users;
                        vma.rooms = rooms;
                        vma.addRoomFormCb = addRoomFormCb;

                        /* TODO erase/comment this; for testing purposes only */
                        vma.room = {};
                        vma.room.description = 'one two three ' + Math.round(Math.random() * 10000);
                        vma.room.editors = [
                            '55a8e758781779641a5526e6',
                            '55a912cd012489b814275a9b',
                            '55a91364012489b814275a9c'
                        ];
                        //vma.room.who = '55a8e757781779641a5526e5';
                        vma.room.who = auth.currentUser();
                        vma.room.whenDate = new Date('2015-07-21T21:00:00.000Z');
                        vma.room.whenStartTime = new Date('1970-01-01T09:20:00.000Z');
                        vma.room.whenEndTime = new Date('1970-01-01T11:40:00.000Z');
                        vma.room.where = '55a8e758781779641a5526e7';

                        function addRoomFormCb() {
                            var who = angular.copy(vma.room.who);
                            vma.room = {};
                            vma.room.who = who;
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
                        room: function (rooms, $stateParams, formatservice) {
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
                        },
                        users: function () {
                            //if ($stateParams.id) {
                            //    for (var i = 0; i < rooms.length; i++) {
                            //        if ($stateParams.id === rooms[i]._id) {
                            //            return formatservice.formatRoomDetails(rooms[i]);
                            //        }
                            //    }
                            //}

                            return dataservice.gettingUsers();
                        },
                        rooms: function () {
                            //if ($stateParams.id) {
                            //    for (var i = 0; i < rooms.length; i++) {
                            //        if ($stateParams.id === rooms[i]._id) {
                            //            return formatservice.formatRoomDetails(rooms[i]);
                            //        }
                            //    }
                            //}

                            return dataservice.gettingRooms();
                        }
                    },
                    controller: ['$scope', '$state', 'room', 'users', 'rooms',
                        function ($scope, $state, room, users, rooms) {
                        var vme = this;

                        vme.editRoomFormCb = editRoomFormCb;

                        room.$promise.then(function (data) {
                            vme.room = formatservice.formatRoomEditIn(data);
                        });

                        //vme.room = room;
                        vme.users = users;
                        vme.rooms = rooms;

                        function editRoomFormCb() {
                            $state.reload();
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
