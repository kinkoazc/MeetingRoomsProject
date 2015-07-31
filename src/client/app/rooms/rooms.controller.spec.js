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

describe('Midway: Testing RoomsController', function () {
    var tester,
        adminToken = window.testingGlobals.token;

    beforeEach(function () {
        if (tester) {
            tester.destroy();
        }
        tester = ngMidwayTester('app');
        auth = tester.inject('auth');//log in as admin, providing the token
        auth.saveToken(adminToken);
    });

    it('should load the RoomsController properly when /rooms route is accessed', function (done) {
        tester.visit('/rooms/list', function () {
            tester.path().should.eq('/rooms/list');
            var current = tester.inject('$state').current;
            var controller = tester.controller('RoomsController');//current.controller;
            var scope = current.scope;

            expect(controller.title).to.equal('Rooms');
            done();
        });
    });
});
