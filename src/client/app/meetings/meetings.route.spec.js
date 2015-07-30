/* jshint -W117, -W030 */
describe('meetings routes', function () {
    describe('state', function () {
        var tester,
            adminToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0MzgzMzYxNzMsIl9pZCI6IjU1YTh' +
                'lNzU3NzgxNzc5NjQxYTU1MjZlNSIsImhhc2giOiI5NTNmYjkxNzYzYTk3YzQxMDcxZGU3MmNlOTRlNjM4YzFi' +
                'OTc0NWE5NDk5OTRmNjA3YTg1NDA5N2YwZjQ3NWY4OGM2YTE5YTYxOTI2NTcyODBlYjljMGMyZWZkYWI5YWIwM' +
                'zY5MTMxZjNjMTI0ZGMyNzU1YTVlM2FhMTllZDRiYSIsInNhbHQiOiI5NDBiZTBlZWFhMDBmN2I1ZTgxN2JjMz' +
                'E1YjhkYTI5YSIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiX192IjowLCJ1cGRhdGVkT24iOiIyMDE1LTA' +
                '3LTE3VDExOjMwOjMxLjU0NloiLCJhZG1pbiI6dHJ1ZX0.VIthwiyWs10JnKsdW8oSeEgOVbP99k65gyzp5CAcNZQ',
            meetingId = '55a8e758781779641a5526e9';//admin
        //var controller, token, view = 'app/meetings/meetings.html';

        beforeEach(function () {
            //module('app', bard.fakeToastr);

            //creating the tester
            if (tester) {
                tester.destroy();
            }
            tester = ngMidwayTester('app');//, {/* options */})
            auth = tester.inject('auth');//log in as admin, providing the token
            auth.saveToken(adminToken);
            //module('app.meetings', bard.fakeToastr);
            //bard.inject(this, '$controller', '$q', '$rootScope', '$state', '$window', '$filter', '$timeout', 'auth');
            //
            //bard.mockService(auth, {
            //    saveToken: function () {
            //        token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0MzgxNzk5MzAsIl9pZCI6Ij' +
            //            'U1YThlNzU3NzgxNzc5NjQxYTU1MjZlNSIsImhhc2giOiI5NTNmYjkxNzYzYTk3YzQxMDcxZGU3' +
            //            'MmNlOTRlNjM4YzFiOTc0NWE5NDk5OTRmNjA3YTg1NDA5N2YwZjQ3NWY4OGM2YTE5YTYxOTI2NTcy' +
            //            'ODBlYjljMGMyZWZkYWI5YWIwMzY5MTMxZjNjMTI0ZGMyNzU1YTVlM2FhMTllZDRiYSIsInNhbHQiO' +
            //            'iI5NDBiZTBlZWFhMDBmN2I1ZTgxN2JjMzE1YjhkYTI5YSIsImVtYWlsIjoiYWRtaW5AZ21haWwu' +
            //            'Y29tIiwiX192IjowLCJ1cGRhdGVkT24iOiIyMDE1LTA3LTE3VDExOjMwOjMxLjU0NloiLCJhZG1p' +
            //            'biI6dHJ1ZX0.VoONJ5fAJ8nS6jPsj5hO71p5OAunAaAycPmY_Y9gmas';
            //    },
            //    getToken: function () {
            //        return token;
            //    },
            //    isLoggedIn: function () {
            //        return true;
            //    },
            //    currentMeeting: function () {
            //        return {
            //            isAdmin: true,
            //            email: 'admin@gmail.com'
            //        };
            //    },
            //    register: function () {},
            //    logOut: function () {
            //        token = '';
            //    },
            //    isAuthorized: function () {
            //        return true;
            //    },
            //    _default:    $q.when([])
            //});
            //
            //$rootScope.$apply();
        });

        it('should have a working meetings list page', function (done) {
            tester.visit('/meetings/list', function () {
                expect(tester.path()).to.equal('/meetings/list');
                //expect(tester.viewElement().html()).to.contain('Video Projector');

                var current = tester.inject('$state').current;
                //var controller = current.controller;
                var template = current.templateUrl;
                var scope = tester.viewScope();
                //var scope = current.scope;
                //expect(scope.title).to.equal('Meetings status');
                //console.log('current.resolve.meetings: ', current.resolve.meetings().then(function () {
                //
                //}));

                expect(current.title).to.equal('Meetings list');//state title
                expect(scope.title).to.equal('Meetings:  Meetings list');//page title
                expect(template).to.equal('app/meetings/meetings.mru.list.html');

                done();
            });
        });

        it('should have a working meeting add page', function (done) {
            tester.visit('/meetings/add', function () {
                expect(tester.path()).to.equal('/meetings/add');
                //expect(tester.viewElement().html()).to.contain('Video Projector');

                var current = tester.inject('$state').current;
                //var controller = current.controller;
                var template = current.templateUrl;
                var scope = tester.viewScope();
                //var scope = current.scope;
                //expect(scope.title).to.equal('Meetings status');

                expect(current.title).to.equal('Meeting add');//state title
                expect(scope.title).to.equal('Meetings:  Meeting add');//page title
                expect(template).to.equal('app/meetings/meetings.mru.add.html');

                done();
            });
        });

        //xit('should have a working meeting edit page', function (done) {
        //    tester.visit('/meetings/edit/' + meetingId, function () {
        //        expect(tester.path()).to.equal('/meetings/edit/' + meetingId);
        //        //expect(tester.viewElement().html()).to.contain('Video Projector');
        //
        //        var current = tester.inject('$state').current;
        //        //var controller = current.controller;
        //        var template = current.templateUrl;
        //        var scope = tester.viewScope();
        //        //var scope = current.scope;
        //        //expect(scope.title).to.equal('Meetings status');
        //
        //        expect(current.title).to.equal('Meeting edit');//state title
        //        expect(scope.title).to.equal('Meetings:  Meeting edit');//page title
        //        expect(template).to.equal('app/meetings/meetings.mru.edit.html');
        //
        //        done();
        //    });
        //});

        it('should have a working meeting edit page, with :id filled', function (done) {
            tester.visit('/meetings/edit/' + meetingId, function () {
                var $params = tester.inject('$stateParams');
                expect($params.id).to.equal(meetingId);

                expect(tester.path()).to.equal('/meetings/edit/' + meetingId);
                //expect(tester.viewElement().html()).to.contain('Video Projector');

                var current = tester.inject('$state').current;
                //var controller = current.controller;
                var template = current.templateUrl;
                var scope = tester.viewScope();
                //var scope = current.scope;
                //expect(scope.title).to.equal('Meetings status');

                expect(current.title).to.equal('Meeting edit');//state title
                expect(scope.title).to.equal('Meetings:  Meeting edit');//page title
                expect(template).to.equal('app/meetings/meetings.mru.edit.html');

                done();
            });
        });

        it('should have a working meeting details page', function (done) {
            tester.visit('/meetings/details/' + meetingId, function () {
                var $params = tester.inject('$stateParams');
                expect($params.id).to.equal(meetingId);

                expect(tester.path()).to.equal('/meetings/details/' + meetingId);
                //expect(tester.viewElement().html()).to.contain('Video Projector');

                var current = tester.inject('$state').current;
                //var controller = current.controller;
                var template = current.templateUrl;
                var scope = tester.viewScope();
                //var scope = current.scope;
                //expect(scope.title).to.equal('Meetings status');

                expect(current.title).to.equal('Meeting details');//state title
                expect(scope.title).to.equal('Meetings:  Meeting details');//page title
                expect(template).to.equal('app/meetings/meetings.mru.details.html');

                done();
            });

        });

        afterEach(function () {
            //destroying the tester
            tester.destroy();
            tester = null;
        });
    });
});
