/* jshint -W117, -W030 */
describe('MeetingsController', function () {
    var $scope, ctrl, $httpBackend;//, auth,
    //var meetingId = window.testingGlobals.meetingId;

    beforeEach(module('app'));

    beforeEach(inject(function (_$httpBackend_, $rootScope, $controller, _auth_) {
        $httpBackend = _$httpBackend_;
        //auth = _auth_;

        //$httpBackend
        //    .whenGET('/api/meetings')
        //    .respond(function (method, url, data) {
        //        var meeting = [
        //            {
        //                '_id': '55a8e758781779641a5526e9',
        //                'duration': 4800000,
        //                'when': 1434180000000,
        //                'description': 'Scrum meeting',
        //                '__v': 0,
        //                'room': [
        //                    {
        //                        '_id': '55a8e758781779641a5526e7',
        //                        'location': '6th Floor, Europe House',
        //                        'name': 'Room 13',
        //                        '__v': 0,
        //                        'updatedOn': '2015-07-17T11:30:32.224Z',
        //                        'hasConferenceEquipment': true,
        //                        'hasVideoProjector': false,
        //                        'size': 30
        //                    }
        //                ],
        //                'updatedOn': '2015-07-17T11:30:32.234Z',
        //                'allowed': [
        //                    {
        //                        '_id': '55a8e757781779641a5526e5',
        //                        'hash': '953fb91763a97c41071de72ce94e638c1b974' +
        //                        '5a949994f607a854097f0f475f88c6a19a6192657280e' +
        //                        'b9c0c2efdab9ab0369131f3c124dc2755a5e3aa19ed4ba',
        //                        'salt': '940be0eeaa00f7b5e817bc315b8da29a',
        //                        'email': 'admin@gmail.com',
        //                        '__v': 0,
        //                        'updatedOn': '2015-07-17T11:30:31.546Z',
        //                        'admin': true
        //                    },
        //                    {
        //                        '_id': '55a8e758781779641a5526e6',
        //                        'hash': '8e1a609958244250e5b508625de000944e4690b' +
        //                        '76355953d40235f473fdc1cb6995bfc3f647674684163d' +
        //                        'f3c7dde1c330d976f5736efd2a02c735243879f9072',
        //                        'salt': '816ac755f8cc3fed5d317ef52d730428',
        //                        'email': 'user@gmail.com',
        //                        '__v': 0,
        //                        'updatedOn': '2015-07-17T11:30:32.219Z',
        //                        'admin': false
        //                    }
        //                ],
        //                'who': [
        //                    {
        //                        '_id': '55a8e757781779641a5526e5',
        //                        'hash': '953fb91763a97c41071de72ce94e638c1b9745a9' +
        //                        '49994f607a854097f0f475f88c6a19a6192657280eb9c0c2' +
        //                        'efdab9ab0369131f3c124dc2755a5e3aa19ed4ba',
        //                        'salt': '940be0eeaa00f7b5e817bc315b8da29a',
        //                        'email': 'admin@gmail.com',
        //                        '__v': 0,
        //                        'updatedOn': '2015-07-17T11:30:31.546Z',
        //                        'admin': true
        //                    }
        //                ]
        //            },
        //            {
        //                '_id': '55af72ead51160b82d48fcd5',
        //                'description': 'one two three 8909',
        //                'when': 1437556800000,
        //                'duration': 8400000,
        //                '__v': 0,
        //                'room': [
        //                    {
        //                        '_id': '55a8e758781779641a5526e7',
        //                        'location': '6th Floor, Europe House',
        //                        'name': 'Room 13',
        //                        '__v': 0,
        //                        'updatedOn': '2015-07-17T11:30:32.224Z',
        //                        'hasConferenceEquipment': true,
        //                        'hasVideoProjector': false,
        //                        'size': 30
        //                    }
        //                ],
        //                'updatedOn': '2015-07-22T10:39:38.575Z',
        //                'allowed': [
        //                    {
        //                        '_id': '55a912cd012489b814275a9b',
        //                        'hash': '67570cf33f6ab58518b9ad29365d52f6b623466d5d' +
        //                        'd8ed4f32b1d2a8ecb4f43f8612f2ea8dbecd046caa8a4e1b22' +
        //                        '751762a5cc3489c398247c9356a6d90f7e50',
        //                        'salt': '128e36ed38dd011294a85d6e07c23a92',
        //                        'email': 'admin@gmail.com58',
        //                        '__v': 0,
        //                        'updatedOn': '2015-07-23T07:45:27.912Z',
        //                        'admin': false
        //                    },
        //                    {
        //                        '_id': '55a91364012489b814275a9c',
        //                        'hash': 'aa09e5fb679a8fbb7613ab959df2d18cf0d3ca93992' +
        //                        '1cd5085ef28f842e9f2b41e3eea73a47392ab1f795bd921302b' +
        //                        '991e9130a921e093f6ff9ecb43ff611011',
        //                        'salt': '9db8d55feb8012278fd4c8d6a9a0c632',
        //                        'email': 'admin@gmail.com5559',
        //                        '__v': 0,
        //                        'updatedOn': '2015-07-17T14:38:28.618Z',
        //                        'admin': false
        //                    },
        //                    {
        //                        '_id': '55a8e757781779641a5526e5',
        //                        'hash': '953fb91763a97c41071de72ce94e638c1b9745a94999' +
        //                        '4f607a854097f0f475f88c6a19a6192657280eb9c0c2efdab9ab' +
        //                        '0369131f3c124dc2755a5e3aa19ed4ba',
        //                        'salt': '940be0eeaa00f7b5e817bc315b8da29a',
        //                        'email': 'admin@gmail.com',
        //                        '__v': 0,
        //                        'updatedOn': '2015-07-17T11:30:31.546Z',
        //                        'admin': true
        //                    }
        //                ],
        //                'who': [
        //                    {
        //                        '_id': '55a8e757781779641a5526e5',
        //                        'hash': '953fb91763a97c41071de72ce94e638c1b9745a949994f' +
        //                        '607a854097f0f475f88c6a19a6192657280eb9c0c2efdab9ab0369' +
        //                        '131f3c124dc2755a5e3aa19ed4ba',
        //                        'salt': '940be0eeaa00f7b5e817bc315b8da29a',
        //                        'email': 'admin@gmail.com',
        //                        '__v': 0,
        //                        'updatedOn': '2015-07-17T11:30:31.546Z',
        //                        'admin': true
        //                    }
        //                ]
        //            }
        //        ];
        //
        //        return [200, meeting, {}];
        //    });

        $httpBackend
            .whenGET('/api/room-status')
            .respond(function (method, url, data) {
                return [200, [], {}];
            });

        //auth.saveToken(adminToken);
        $scope = $rootScope.$new();
        ctrl = $controller('MeetingsController', {$scope: $scope});
        //ctrl = $controller('MeetingsController', {
        //    $scope: $scope,
        //    $stateParams: {
        //        id: meetingId
        //    }
        //});
    }));

    describe('Check if MeetingsController is instantiated: ', function () {
        it('should have a MeetingsController', function () {
            $httpBackend.flush();
            expect(ctrl).not.to.equal(null);
        });
    });

    describe('Check if MeetingsController is working: ', function () {
        it('should have a properly working MeetingsController', function () {
            $httpBackend.flush();
            expect(ctrl.title).to.equal('Meetings');
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});

describe('Midway: Testing MeetingsController', function () {
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

    it('should load the MeetingsController properly when /meetings route is accessed', function (done) {
        tester.visit('/meetings/list', function () {
            tester.path().should.eq('/meetings/list');
            var current = tester.inject('$state').current;
            var controller = tester.controller('MeetingsController');//current.controller;
            var scope = current.scope;

            expect(controller.title).to.equal('Meetings');
            done();
        });
    });
});
