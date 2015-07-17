(function() {
    'use strict';

    angular
        .module('app.rooms')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'rooms',
                config: {
                    url: '/rooms',
                    templateUrl: 'app/rooms/rooms.html',
                    controller: 'RoomsController',
                    controllerAs: 'vm',
                    title: 'Rooms',
                    settings: {
                        nav: 2,
                        inMainMenu : true,
                        authLevel: 1,//TODO create separate state for room status, and change this to 3(admin)
                        content: '<i class="fa fa-random"></i> Rooms'
                    }
                }
            }
        ];
    }
})();
