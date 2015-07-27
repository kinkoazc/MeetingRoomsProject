(function () {
    'use strict';

    angular
        .module('app.login')
        .run(appRun);

    appRun.$inject = ['$state', '$timeout', 'auth', 'routerHelper'];
    /* @ngInject */
    function appRun($state, $timeout, auth, routerHelper) {
        routerHelper.configureStates(getStates($state, $timeout, auth));
    }

    function getStates($state, $timeout, auth) {
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
                        inMainMenu: true,
                        authLevel: 1,
                        content: '<i class="fa fa-sign-in"></i> Login/Register'
                    }
                }
            },
            {
                state: 'logout',
                config: {
                    url: '/logout',
                    templateUrl: 'app/login/logout.html',
                    controller: 'LoginController',
                    controllerAs: 'vm',
                    title: 'Logout',
                    onEnter: function () {
                        auth.logOut();
                        $timeout(function () {
                            $state.go('login');
                        });
                    },
                    onExit: function () {

                    },
                    settings: {
                        nav: 4,
                        inMainMenu: true,
                        authLevel: 2,
                        content: '<i class="fa fa-sign-in"></i> Logout ' +
                        '<span ng-bind="vm.auth.currentUser().email"></span>'
                    }
                }
            }
        ];
    }
})();
