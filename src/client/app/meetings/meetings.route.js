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
                        nav: 2,
                        content: '<i class="fa fa-briefcase"></i> Meetings'
                    }
                }
            }
        ];
    }
})();
