(function() {
    'use strict';

    angular
        .module('app.meetings')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'meetings',
                config: {
                    url: '/meetings',
                    templateUrl: 'app/meetings/meetings.html',
                    controller: 'MeetingsController',
                    controllerAs: 'vm',
                    title: 'Meetings',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-briefcase"></i> Meetings'
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
                    title: 'Meeting details'
                }
            },
            {
                state: 'meetings.edit',
                config: {
                    url: '/edit/:id',
                    templateUrl: 'app/meetings/meetings.mru.edit.html',
                    title: 'Meeting edit'
                }
            }
        ];
    }
})();
