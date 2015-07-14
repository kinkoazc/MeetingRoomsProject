/* jshint -W117, -W030 */
describe('meetings routes', function () {
    describe('state', function () {
        var controller;
        var view = 'app/meetings/meetings.html';

        beforeEach(function() {
            module('app.meetings', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        it('should map state meetings to url /meetings ', function() {
            expect($state.href('meetings', {})).to.equal('/meetings');
        });

        it('should map /meetings route to meetings View template', function () {
            expect($state.get('meetings').templateUrl).to.equal(view);
        });

        it('of meetings should work with $state.go', function () {
            $state.go('meetings');
            $rootScope.$apply();
            expect($state.is('meetings'));
        });
    });
});
