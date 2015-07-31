/* jshint -W117, -W030 */
describe('LoginController', function () {
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
        ctrl = $controller('LoginController', {$scope: $scope});
    }));

    describe('Check if LoginController is instantiated: ', function () {
        it('should have a LoginController', function () {
            $httpBackend.flush();
            expect(ctrl).not.to.equal(null);
        });
    });

    describe('Check if LoginController is working: ', function () {
        it('should have a properly working LoginController', function () {
            $httpBackend.flush();
            expect(ctrl.title).to.equal('Login');
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});

describe('Midway: Testing LoginController', function () {
    var tester,
        adminToken = window.testingGlobals.token;

    beforeEach(function () {
        if (tester) {
            tester.destroy();
        }
        tester = ngMidwayTester('app');
        //auth = tester.inject('auth');//log in as admin, providing the token
        //auth.saveToken(adminToken);
    });

    it('should load the LoginController properly when /login route is accessed', function (done) {
        tester.visit('/login', function () {
            tester.path().should.eq('/login');
            var current = tester.inject('$state').current;
            var controller = tester.controller('LoginController');//current.controller;
            var scope = current.scope;

            expect(controller.title).to.equal('Login');
            done();
        });
    });
});

