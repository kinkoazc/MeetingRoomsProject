/* jshint -W117, -W030 */
describe('RoomsController', function () {
    var $scope, ctrl, $httpBackend;

    beforeEach(module('app'));

    beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
        $httpBackend = _$httpBackend_;

        $httpBackend
            .whenGET('/api/room-status')
            .respond(function (method, url, data) {
                return [200, [], {}];
            });

        $scope = $rootScope.$new();
        ctrl = $controller('RoomsController', {$scope: $scope});
    }));

    describe('Check if RoomsController is instantiated: ', function () {
        it('should have a RoomsController', function () {
            $httpBackend.flush();
            expect(ctrl).not.to.equal(null);
        });
    });

    describe('Check if RoomsController is working: ', function () {
        it('should have a properly working RoomsController', function () {
            $httpBackend.flush();
            expect(ctrl.title).to.equal('Rooms');
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});
