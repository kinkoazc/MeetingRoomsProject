(function () {
    'use strict';

    angular
        .module('app.meetings')
        .controller('MeetingsController', MeetingsController);

    MeetingsController.$inject = ['$rootScope', '$state', '$stateParams', 'logger', 'routerHelper'];
    /* @ngInject */
    function MeetingsController($rootScope, $state, $stateParams, logger, routerHelper) {
        var vm = this,
            states = routerHelper.getStates();
        vm.editForm = editForm;
        vm.isCurrent = isCurrent;
        vm.meetings = [];
        vm.meeting = {};
        vm.meetingsNavRoutes = [];
        vm.title = 'Meetings';
        vm.user = 'User One';

        activate();

        function activate() {
            logger.info('Activated Meetings View');

            $rootScope.$on('$stateChangeSuccess', function () {
                //alert('state changed successfully');
                if ($state.params.id) {
                    for (var i=0;i<vm.meetings.length;i++) {
                        if ($state.params.id==vm.meetings[i].id+"") {
                            vm.meeting = vm.meetings[i];
                        }
                    }
                }
            });

            $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
                getNavRoutes(toState);

                if (fromParams && fromParams.id && !toParams.id) {
                    toParams.id=fromParams.id;
                }

            });

            getNavRoutes();
            getMeetings();
        }

        function getNavRoutes(toState) {
            var current = toState || $state.current;

            if (!angular.isObject(current) || current.name.indexOf('meetings.')>-1 && current.url.indexOf(':id')===-1) {
                getMeetingsNavRoutes();
            } else if (angular.isObject(current) && current.name.indexOf('meetings.')>-1 && current.url.indexOf(':id')>-1) {
                getMeetingNavRoutes();
            }
        }

        function getMeetingsNavRoutes() {
            vm.meetingsNavRoutes = states.filter(function (r) {
                return (r.name.indexOf('meetings.') === 0 && r.url.indexOf(':id')===-1);
            });
        }

        function getMeetingNavRoutes() {
            vm.meetingsNavRoutes = states.filter(function (r) {
                return (r.name.indexOf('meetings.') === 0 && r.url.indexOf(':id')>-1);
            });
        }

        function isCurrent(route) {
            if (!route.title || !$state.current || !$state.current.title) {
                return '';
            }
            var menuName = route.title;
            return $state.current.title.substr(0, menuName.length) === menuName ? 'active' : '';
        }

        function getMeetings() {
            vm.meetings = [
                {
                    description: "Scrum meeting",
                    who: "User One",
                    when: "17.07.2015, 11:00-12:50",
                    duration: "1h 50min",
                    where: "Room 45",
                    allowed: "User One, User Three",
                    id: 1231241
                },
                {
                    description: "Investors meeting",
                    who: "User Three",
                    when: "17.07.2015, 13:00-15:50",
                    duration: "2h 50min",
                    where: "Room 30",
                    allowed: "User Three",
                    id: 1231256
                }
            ];
        }

        function editForm(e) {

        }
    }
})();
