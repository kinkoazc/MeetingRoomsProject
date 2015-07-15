(function() {
    'use strict';

    angular
        .module('app.core')
        .directive('mru', mru);

    /* @ngInject */
    function mru() {

        /* @ngInject */
        function MruController($state, routerHelper) {
            var vm = this;

            //var states = routerHelper.getStates();
            //vm.isCurrent = isCurrent;
            //
            //activate();
            //
            //function activate() {
            //    getNavRoutes();
            //}
            //
            //function getNavRoutes() {
            //    vm.navRoutes = states.filter(function(r) {
            //        return r.settings && r.settings.nav;
            //    }).sort(function(r1, r2) {
            //        return r1.settings.nav - r2.settings.nav;
            //    });
            //}
            //
            //function isCurrent(route) {
            //    if (!route.title || !$state.current || !$state.current.title) {
            //        return '';
            //    }
            //    var menuName = route.title;
            //    return $state.current.title.substr(0, menuName.length) === menuName ? 'active' : '';
            //}

            vm.listActive = true;
            vm.section = '';
        }

        return {
            bindToController: true,
            controller: MruController,
            controllerAs: 'vm',
            restrict: 'E',
            scope: {
                'navRoutes': '=routes',
                'section': '@'
            },
            templateUrl: 'app/core/mru.html'
        };
    }

})();
