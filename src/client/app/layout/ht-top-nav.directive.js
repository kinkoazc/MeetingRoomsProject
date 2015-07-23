(function () {
    'use strict';

    angular
        .module('app.layout')
        .directive('htTopNav', htTopNav);


    /* @ngInject */
    function htTopNav() {

        TopNavController.$inject = ['$state', 'auth', 'routerHelper'];
        /* @ngInject */
        function TopNavController($state, auth, routerHelper) {
            var vm = this,
                states = routerHelper.getStates();

            vm.auth = auth;
            vm.isAuthorized = auth.isAuthorized;
            vm.isCurrent = isCurrent;
            vm.isLoggedIn = auth.isLoggedIn;
            vm.navRoutes = [];

            activate();

            function activate() {
                getNavRoutes();
            }

            function getNavRoutes() {
                vm.navRoutes = states.filter(function (r) {
                    return r.settings && r.settings.nav && r.settings.inMainMenu === true;
                }).sort(function (r1, r2) {
                    return r1.settings.nav - r2.settings.nav;
                });
            }

            function isCurrent(route) {
                if (!route.title || !$state.current || !$state.current.title) {
                    return '';
                }

                var menuName = route.name;
                if (menuName && $state.current.name) {
                    return menuName.split('.')[0] === $state.current.name.split('.')[0] ? 'active' : '';
                }
            }
        }

        return {
            bindToController: true,
            controller: TopNavController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
                'navline': '='
            },
            templateUrl: 'app/layout/ht-top-nav.html'
        };
    }
})();
