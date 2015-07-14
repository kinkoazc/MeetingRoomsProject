(function () {
    'use strict';

    angular
        .module('app.meetings')
        .controller('MeetingsController', MeetingsController);

    MeetingsController.$inject = ['logger'];
    /* @ngInject */
    function MeetingsController(logger) {
        var vm = this;
        vm.title = 'Meetings';

        activate();

        function activate() {
            logger.info('Activated Meetings View');
        }
    }
})();
