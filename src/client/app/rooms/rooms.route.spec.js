/* jshint -W117, -W030 */
describe('rooms routes', function () {
    describe('state', function () {
        var controller;
        var view = 'app/rooms/rooms.html';

        beforeEach(function() {
            module('app.rooms', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        it('should map state rooms to url /rooms ', function() {
            expect($state.href('rooms', {})).to.equal('/rooms');
        });

        it('should map /rooms route to rooms View template', function () {
            expect($state.get('rooms').templateUrl).to.equal(view);
        });

        it('of rooms should work with $state.go', function () {
            $state.go('rooms');
            $rootScope.$apply();
            expect($state.is('rooms'));
        });
    });
});
