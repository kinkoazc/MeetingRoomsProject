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

describe('Midway: Testing UsersController', function () {
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

    it('should load the UsersController properly when /users route is accessed', function (done) {
        tester.visit('/users/list', function () {
            tester.path().should.eq('/users/list');
            var current = tester.inject('$state').current;
            var controller = tester.controller('UsersController');//current.controller;
            var scope = current.scope;

            expect(controller.title).to.equal('Users');
            done();
        });
    });
});
