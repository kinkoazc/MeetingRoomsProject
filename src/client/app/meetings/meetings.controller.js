(function () {
    'use strict';

    angular
        .module('app.meetings')
        .controller('MeetingsController', MeetingsController);

    MeetingsController.$inject = ['$state', 'logger', 'routerHelper'];
    /* @ngInject */
    function MeetingsController($state, logger, routerHelper) {
        var vm = this,
            states = routerHelper.getStates();
        vm.isCurrent = isCurrent;
        vm.navRoutes = [];
        vm.title = 'Meetings';

        activate();

        function activate() {
            logger.info('Activated Meetings View');
            getNavRoutes();
        }

        function getNavRoutes() {
            vm.navRoutes = states.filter(function(r) {
                return r.name.indexOf('meetings.')===0;
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
})();
