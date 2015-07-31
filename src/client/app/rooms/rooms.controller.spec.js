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
        adminToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0MzgzMzYxNzMsIl9pZCI6IjU1YTh' +
            'lNzU3NzgxNzc5NjQxYTU1MjZlNSIsImhhc2giOiI5NTNmYjkxNzYzYTk3YzQxMDcxZGU3MmNlOTRlNjM4YzFi' +
            'OTc0NWE5NDk5OTRmNjA3YTg1NDA5N2YwZjQ3NWY4OGM2YTE5YTYxOTI2NTcyODBlYjljMGMyZWZkYWI5YWIwM' +
            'zY5MTMxZjNjMTI0ZGMyNzU1YTVlM2FhMTllZDRiYSIsInNhbHQiOiI5NDBiZTBlZWFhMDBmN2I1ZTgxN2JjMz' +
            'E1YjhkYTI5YSIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiX192IjowLCJ1cGRhdGVkT24iOiIyMDE1LTA' +
            '3LTE3VDExOjMwOjMxLjU0NloiLCJhZG1pbiI6dHJ1ZX0.VIthwiyWs10JnKsdW8oSeEgOVbP99k65gyzp5CAcNZQ';

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
