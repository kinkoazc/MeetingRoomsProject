(function() {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    appRun.$inject = ['$rootScope', '$state', 'auth', 'routerHelper'];
    /* @ngInject */
    function appRun($rootScope, $state, auth, routerHelper) {
        routerHelper.configureStates(getStates(), '/rooms/status');

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
            if (!auth.isAuthorized(toState.settings.authLevel)) {
                event.preventDefault();
                $state.go('rooms.status');
                return false;
            }
        });
    }

    function getStates() {
        return [
            {
                state: '404',
                config: {
                    url: '/404',
                    templateUrl: 'app/core/404.html',
                    title: '404'
                }
            }
        ];
    }

})();
