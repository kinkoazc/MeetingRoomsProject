(function () {
    'use strict';

    angular
        .module('app.meetings')
        .run(appRun);

    appRun.$inject = ['$q', '$stateParams', 'routerHelper'];
    /* @ngInject */
    function appRun($q, $stateParams, routerHelper) {
        routerHelper.configureStates(getStates($q, $stateParams));
    }

    function getStates($q, $stateParams) {
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
                        content: '<i class="fa fa-briefcase"></i> Meetings'
                    },
                    resolve: {
                        meetings: function () {
                            console.log('resolve meetings');
                            var meetings = [
                                {
                                    description: "Scrum meeting",
                                    who: "User One",
                                    when: 1488323623006,
                                    duration: 6600000,
                                    where: "Room 45",
                                    allowed: "User One, User Three",
                                    id: 1231241
                                },
                                {
                                    description: "Investors meeting",
                                    who: "User Three",
                                    when: 1498323623006,
                                    duration: 10200000,
                                    where: "Room 30",
                                    allowed: "User Three",
                                    id: 1231256
                                }
                            ];

                            return $q.when(meetings);
                        },
                        meeting: function ($stateParams) {
                            if ($stateParams.id) {
                                return this.meetings().when(
                                    function (data) {
                                        for (var i = 0; i < data.length; i++) {
                                            if ($stateParams.id == data[i].id + "") {
                                                return data[i];
                                            }
                                        }

                                        return {};
                                    }
                                )
                            } else {
                                return {};
                            }
                        }
                    }
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
                        content: '<i class="fa fa-briefcase"></i> Meetings'
                    }
                }
            },
            {
                state: 'meetings.add',
                config: {
                    url: '/add',
                    templateUrl: 'app/meetings/meetings.mru.add.html',
                    title: 'Meetings add'
                }
            },
            {
                state: 'meetings.details',
                config: {
                    url: '/details/:id',
                    templateUrl: 'app/meetings/meetings.mru.details.html',
                    title: 'Meeting details',
                    resolve: {
                        meeting: function (meetings, $stateParams) {
                            if ($stateParams.id) {
                                for (var i = 0; i < meetings.length; i++) {
                                    if ($stateParams.id == meetings[i].id + "") {
                                        return meetings[i];
                                    }
                                }
                            }
                        }
                    },
                    controller: function (meeting) {
                        var vm = this;
                        vm.meeting = meeting;
                    },
                    controllerAs: 'vm'
                }
            },
            {
                state: 'meetings.edit',
                config: {
                    url: '/edit/:id',
                    templateUrl: 'app/meetings/meetings.mru.edit.html',
                    title: 'Meeting edit',
                    resolve: {
                        meeting: function (meetings, $stateParams) {
                            if ($stateParams.id) {
                                for (var i = 0; i < meetings.length; i++) {
                                    if ($stateParams.id == meetings[i].id + "") {
                                        return meetings[i];
                                    }
                                }
                            }
                        }
                    },
                    controller: function (meeting) {
                        var vm = this;
                        vm.meeting = meeting;
                    },
                    controllerAs: 'vm'
                }
            }
        ];
    }
})();
