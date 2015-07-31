/* jshint -W117, -W030 */
describe('UsersController', function () {
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
        ctrl = $controller('UsersController', {$scope: $scope});
    }));

    describe('Check if UsersController is instantiated: ', function () {
        it('should have a UsersController', function () {
            $httpBackend.flush();
            expect(ctrl).not.to.equal(null);
        });
    });

    describe('Check if UsersController is working: ', function () {
        it('should have a properly working UsersController', function () {
            $httpBackend.flush();
            expect(ctrl.title).to.equal('Users');
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});
