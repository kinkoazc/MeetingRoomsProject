(function () {
    'use strict';

    angular
        .module('app.meetings')
        .controller('MeetingsController', MeetingsController);

    MeetingsController.$inject = ['$rootScope', '$state', '$window',
        '$filter', '$timeout', 'auth', 'logger', 'routerHelper', 'dataservice', 'formatservice'];
    /* @ngInject */
    /*jshint maxparams: 15 */
    function MeetingsController($rootScope, $state, $window,
                                $filter, $timeout, auth, logger, routerHelper, dataservice, formatservice) {

        var vm = this,
            states = routerHelper.getStates();
        vm.deleteMeeting = deleteMeeting;
        vm.isCurrent = isCurrent;
        vm.isAuthorized = auth.isAuthorized;
        //vm.meetings = [];
        //vm.meeting = {};
        vm.navRoutes = [];
        vm.sendAddForm = sendAddForm;
        vm.sendEditForm = sendEditForm;
        vm.title = 'Meetings';
        //vm.user = {};

        activate();

        function activate() {
            logger.info('Activated Meetings View');

            $rootScope.$on('$stateChangeSuccess', function () {
                //console.log('state changed successfully');

                //if ($state.params.id) {
                //    for (var i = 0; i < vm.meetings.length; i++) {
                //        if ($state.params.id === vm.meetings[i].id + '') {
                //            vm.meeting = vm.meetings[i];
                //        }
                //    }
                //
                //    if (angular.equals({}, vm.meeting)) {
                //        $state.go('rooms.status');
                //    }
                //}

                //if (angular.equals({}, vm.meeting)) {
                //    vm.meeting=meeting;
                //}
            });

            $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
                getNavRoutes(toState);

                if (fromParams && fromParams.id && !toParams.id) {
                    toParams.id = fromParams.id;
                }

            });

            getNavRoutes();
            //vm.meetings = formatservice.formatMeetingsList(meetings);
            //vm.user = auth.currentUser();
        }

        function getNavRoutes(toState) {
            var current = toState || $state.current;

            if (!angular.isObject(current) || current.name.indexOf('meetings.') > -1 &&
                current.url.indexOf(':id') === -1) {
                getMeetingsNavRoutes();
            } else if (angular.isObject(current) && current.name.indexOf('meetings.') > -1 &&
                current.url.indexOf(':id') > -1) {
                getMeetingNavRoutes();
            }
        }

        function getMeetingsNavRoutes() {
            vm.navRoutes = states.filter(function (r) {
                return (r.name.indexOf('meetings.') === 0 && r.url.indexOf(':id') === -1);
            });
        }

        function getMeetingNavRoutes() {
            vm.navRoutes = states.filter(function (r) {
                return (r.name.indexOf('meetings.') === 0 && r.url.indexOf(':id') > -1);
            });
        }

        function isCurrent(route) {
            if (!route.title || !$state.current || !$state.current.title) {
                return '';
            }

            var menuName = route.title;
            return $state.current.title.substr(0, menuName.length) === menuName ? 'active' : '';
        }

        function sendEditForm(e, meeting, cb) {
            e.preventDefault();

            //console.log('Edit meeting form submitted! ', meeting);
            dataservice.editingMeeting(formatservice.formatMeetingEditOut(meeting)).$promise.then(function (data) {
                if (data.message === 'Not authorized.') {
                    logger.error('You are not authorized to edit this meeting.', data, 'Error!');
                } else {
                    logger.success('Meeting updated successfully.', data, 'Success!');
                }

                // reset the form
                cb();
                //e.target.reset();
            }, function (reason) {
                logger.error('Meeting not updated.', reason, 'Error!');
            });

            return false;
        }

        function sendAddForm(e, meeting, cb) {
            e.preventDefault();

            //console.log('Add meeting form submitted! ', formatservice.formatMeetingAddOut(meeting));
            dataservice.addingMeeting(formatservice.formatMeetingAddOut(meeting)).$promise.then(function (data) {
                if (data.message === 'Not authorized.') {
                    logger.error('You are not authorized to add this meeting.', data, 'Error!');
                } else {
                    logger.success('Meeting saved successfully.', data, 'Success!');
                }

                // reset the form
                cb();
                //e.target.reset();
            }, function (reason) {
                logger.error('Meeting not saved.', reason, 'Error!');
            });

            return false;
        }

        function deleteMeeting(id) {
            if ($window.confirm('Are you sure you want to delete the entry?')) {
                dataservice.deletingMeeting(id).$promise.then(function (data) {
                    if (data.message === 'Not authorized.') {
                        logger.error('You are not authorized to delete this meeting.', data, 'Error!');
                    } else {
                        logger.success('Meeting deleted successfully.', data, 'Success!');
                    }

                    if ($state.is('meetings.list')) {
                        $state.reload();
                    } else {
                        $state.go('meetings.list');
                    }
                }, function (reason) {
                    logger.error('Meeting not deleted.', reason, 'Error!');
                });
            }
        }
    }
})();
