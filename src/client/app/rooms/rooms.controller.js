(function () {
    'use strict';

    angular
        .module('app.rooms')
        .controller('RoomsController', RoomsController);

    RoomsController.$inject = ['logger'];
    /* @ngInject */
    function RoomsController(logger) {
        var vm = this;
        vm.title = 'Rooms';

        activate();

        function activate() {
            logger.info('Activated Rooms View');
        }
    }
})();
