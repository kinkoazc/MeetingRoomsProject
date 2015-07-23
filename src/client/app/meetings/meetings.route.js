(function () {
    'use strict';

    angular
        .module('app.meetings')
        .run(appRun);

    appRun.$inject = ['$q', '$stateParams', '$timeout', '$state', 'dataservice', 'routerHelper', 'formatservice'];
    /* @ngInject */
    function appRun($q, $stateParams, $timeout, $state, dataservice, routerHelper, formatservice) {
        routerHelper.configureStates(getStates($q, $stateParams,
            $timeout, $state, dataservice, formatservice));//, null, ['/meetings', '/meetings/list']
    }

    function getStates($q, $stateParams, $timeout, $state, dataservice, formatservice) {
        return [
            {
                state: 'meetings',
                config: {
                    url: '/meetings',
                    templateUrl: 'app/meetings/meetings.html',
                    controller: 'MeetingsController',
                    controllerAs: 'vm',
                    title: 'Meetings',
                    abstract: true,
                    settings: {
                        nav: 1,
                        //inMainMenu: true,
                        content: '<i class="fa fa-briefcase"></i> Meetings'
                    },
                    //onEnter: function ($state) {
                    //    console.log('entering meetings');
                    //    $state.go('meetings.list');
                    //},
                    //onExit: function () {
                    //    console.log('exiting meetings');
                    //},
                    //resolve: {
                    //    meetings: function () {
                    //        //console.log('resolve meetings');
                    //        //var meetings = [
                    //        //    {
                    //        //        description: 'Scrum meeting',
                    //        //        who: 'User One',
                    //        //        when: 1488323623006,
                    //        //        duration: 6600000,
                    //        //        where: 'Room 45',
                    //        //        allowed: 'User One, User Three',
                    //        //        id: 1231241
                    //        //    },
                    //        //    {
                    //        //        description: 'Investors meeting',
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
                    //        //    deferred.resolve(meetings);
                    //        //}, 100);
                    //        //
                    //        //return deferred.promise;//$q.when(meetings);
                    //
                    //        return dataservice.gettingMeetings();
                    //
                    //    }
                        //,
                        //meeting: function ($stateParams) {
                        //    if ($stateParams.id) {
                        //        return this.meetings().when(
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
                state: 'meetings.list',
                config: {
                    url: '/list',
                    templateUrl: 'app/meetings/meetings.mru.list.html',
                    title: 'Meetings list',
                    settings: {
                        nav: 1,
                        inMainMenu: true,
                        authLevel: 2,
                        content: '<i class="fa fa-briefcase"></i> Meetings'
                    },
                    resolve: {
                        meetings: function () {
                            //console.log('resolve meetings');
                            //var meetings = [
                            //    {
                            //        description: 'Scrum meeting',
                            //        who: 'User One',
                            //        when: 1488323623006,
                            //        duration: 6600000,
                            //        where: 'Room 45',
                            //        allowed: 'User One, User Three',
                            //        id: 1231241
                            //    },
                            //    {
                            //        description: 'Investors meeting',
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
                            //    deferred.resolve(meetings);
                            //}, 100);
                            //
                            //return deferred.promise;//$q.when(meetings);

                            return dataservice.gettingMeetings();

                        }
                        //,
                        //meeting: function ($stateParams) {
                        //    if ($stateParams.id) {
                        //        return this.meetings().when(
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
                    controller: ['$scope', 'meetings', function ($scope, meetings) {
                        var vml = this;

                        vml.meetings = [];
                        meetings.$promise.then(function (data) {
                            //$scope.$parent.vm.meetings
                            vml.meetings= formatservice.formatMeetingsList(data);
                        });

                    }],
                    controllerAs: 'vml'
                }
            },
            {
                state: 'meetings.add',
                config: {
                    url: '/add',
                    templateUrl: 'app/meetings/meetings.mru.add.html',
                    title: 'Meeting add',
                    resolve: {
                        users: function () {

                            //if ($stateParams.id) {
                            //    for (var i = 0; i < meetings.length; i++) {
                            //        if ($stateParams.id === meetings[i]._id) {
                            //            return formatservice.formatMeetingDetails(meetings[i]);
                            //        }
                            //    }
                            //}

                            return dataservice.gettingUsers();
                        },
                        rooms: function () {

                            //if ($stateParams.id) {
                            //    for (var i = 0; i < meetings.length; i++) {
                            //        if ($stateParams.id === meetings[i]._id) {
                            //            return formatservice.formatMeetingDetails(meetings[i]);
                            //        }
                            //    }
                            //}

                            return dataservice.gettingRooms();
                        }
                    },
                    controller: ['$state', 'users', 'rooms', 'auth', function ($state, users, rooms, auth) {
                        var vma = this;

                        vma.users = users;
                        vma.rooms = rooms;
                        vma.addMeetingFormCb = addMeetingFormCb;

                        /* TODO erase/comment this; for testing purposes only */
                        vma.meeting = {};
                        vma.meeting.description = 'one two three ' + Math.round(Math.random() * 10000);
                        vma.meeting.editors = [
                            '55a8e758781779641a5526e6',
                            '55a912cd012489b814275a9b',
                            '55a91364012489b814275a9c'
                        ];
                        //vma.meeting.who = '55a8e757781779641a5526e5';
                        vma.meeting.who = auth.currentUser();
                        vma.meeting.whenDate = new Date('2015-07-21T21:00:00.000Z');
                        vma.meeting.whenStartTime = new Date('1970-01-01T09:20:00.000Z');
                        vma.meeting.whenEndTime = new Date('1970-01-01T11:40:00.000Z');
                        vma.meeting.where = '55a8e758781779641a5526e7';

                        function addMeetingFormCb() {
                            var who = angular.copy(vma.meeting.who);
                            vma.meeting = {};
                            vma.meeting.who = who;
                            $state.go('meetings.list');
                        }
                    }],
                    controllerAs: 'vma',
                    settings: {
                        authLevel: 2
                    }
                }
            },
            {
                state: 'meetings.details',
                config: {
                    url: '/details/:id',
                    templateUrl: 'app/meetings/meetings.mru.details.html',
                    title: 'Meeting details',
                    resolve: {
                        meeting: function ($stateParams, formatservice) {//meetings,
                            if ($stateParams.id) {

                                //get only one meeting
                                return dataservice.gettingMeeting($stateParams.id);

                                //return meetings.$promise.then(function (data) {
                                //    for (var i = 0; i < data.length; i++) {
                                //        if ($stateParams.id === data[i]._id) {
                                //            return formatservice.formatMeetingDetails(data[i]);
                                //        }
                                //    }
                                //});
                            }
                        }
                    },
                    controller: ['$scope', 'meeting', function ($scope, meeting) {
                        var vmd = this;

                        meeting.$promise.then(function (data) {
                            vmd.meeting = formatservice.formatMeetingDetails(data);
                        });

                    }],
                    controllerAs: 'vmd',
                    settings: {
                        authLevel: 2
                    }
                }
            },
            {
                state: 'meetings.edit',
                config: {
                    url: '/edit/:id',
                    templateUrl: 'app/meetings/meetings.mru.edit.html',
                    title: 'Meeting edit',
                    resolve: {
                        meeting: function ($stateParams, formatservice) {
                            if ($stateParams.id) {

                                //return meetings.$promise.then(function (data) {
                                //    for (var i = 0; i < data.length; i++) {
                                //        if ($stateParams.id === data[i]._id) {
                                //            return formatservice.formatMeetingEditIn(data[i]);
                                //        }
                                //    }
                                //});

                                //get only one meeting
                                return dataservice.gettingMeeting($stateParams.id);

                            }
                        },
                        users: function () {
                            //if ($stateParams.id) {
                            //    for (var i = 0; i < meetings.length; i++) {
                            //        if ($stateParams.id === meetings[i]._id) {
                            //            return formatservice.formatMeetingDetails(meetings[i]);
                            //        }
                            //    }
                            //}

                            return dataservice.gettingUsers();
                        },
                        rooms: function () {
                            //if ($stateParams.id) {
                            //    for (var i = 0; i < meetings.length; i++) {
                            //        if ($stateParams.id === meetings[i]._id) {
                            //            return formatservice.formatMeetingDetails(meetings[i]);
                            //        }
                            //    }
                            //}

                            return dataservice.gettingRooms();
                        }
                    },
                    controller: ['$scope', '$state', 'meeting', 'users', 'rooms',
                        function ($scope, $state, meeting, users, rooms) {
                        var vme = this;

                        vme.editMeetingFormCb = editMeetingFormCb;

                        meeting.$promise.then(function (data) {
                            vme.meeting = formatservice.formatMeetingEditIn(data);
                        });

                        //vme.meeting = meeting;
                        vme.users = users;
                        vme.rooms = rooms;

                        function editMeetingFormCb() {
                            //$state.reload();
                            $state.go('meetings.details');
                            //var who = angular.copy(vme.meeting.who);
                            //vme.meeting = {};
                            //vme.meeting.who = who;
                        }
                    }],
                    controllerAs: 'vme',
                    settings: {
                        authLevel: 2
                    }
                }
            }
        ];
    }
})();
