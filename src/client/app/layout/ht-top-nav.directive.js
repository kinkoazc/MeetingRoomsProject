(function() {
    'use strict';

    angular
        .module('app.layout')
        .directive('htTopNav', htTopNav);

    /* @ngInject */
    function htTopNav () {

        /* @ngInject */
        function TopNavController($state, routerHelper) {
            var vm = this;

            var states = routerHelper.getStates();
            vm.isCurrent = isCurrent;

            activate();

            function activate() {
                getNavRoutes();
            }

            function getNavRoutes() {
                vm.navRoutes = states.filter(function(r) {
                    return r.settings && r.settings.nav;
                }).sort(function(r1, r2) {
                    return r1.settings.nav - r2.settings.nav;
                });
            }

            function isCurrent(route) {
                if (!route.title || !$state.current || !$state.current.title) {
                    return '';
                }
                var menuName = route.title;
                return $state.current.title.substr(0, menuName.length) === menuName ? 'active' : '';
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
