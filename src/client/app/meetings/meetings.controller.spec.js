/* jshint -W117, -W030 */
describe('MeetingsController', function() {
    var controller;

    beforeEach(function() {
        bard.appModule('app.meetings');
        bard.inject('$controller', '$log', '$rootScope');
    });

    beforeEach(function () {
        controller = $controller('MeetingsController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Meetings controller', function() {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        describe('after activate', function() {
            it('should have title of Meetings', function() {
                expect(controller.title).to.equal('Meetings');
            });

            it('should have logged "Activated"', function() {
                expect($log.info.logs).to.match(/Activated/);
            });
        });
    });
});
