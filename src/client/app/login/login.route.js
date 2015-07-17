(function() {
    'use strict';

    angular
        .module('app.login')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'login',
                config: {
                    url: '/login',
                    templateUrl: 'app/login/login.html',
                    controller: 'LoginController',
                    controllerAs: 'vm',
                    title: 'Login/Register',
                    settings: {
                        nav: 4,
                        inMainMenu : true,
                        authLevel: 1,
                        content: '<i class="fa fa-sign-in"></i> Login/Register'
                    }
                }
            }
        ];
    }
})();
