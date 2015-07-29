/* jshint -W117, -W030 */
describe('rooms routes', function () {
    describe('state', function () {
        var tester,
            adminToken = 'eyJ0eXAiOiJKV1QiLCJhbGciO' +
                'iJIUzI1NiJ9.eyJleHAiOjE0MzgyNDQ2OTAsIl9pZCI6IjU1YThlNzU3NzgxNzc5NjQxYTU1MjZlNSIsI' +
                'mhhc2giOiI5NTNmYjkxNzYzYTk3YzQxMDcxZGU3MmNlOTRlNjM4YzFiOTc0NWE5NDk5OTRmNjA3YTg1NDA' +
                '5N2YwZjQ3NWY4OGM2YTE5YTYxOTI2NTcyODBlYjljMGMyZWZkYWI5YWIwMzY5MTMxZjNjMTI0ZGMyNzU1YT' +
                'VlM2FhMTllZDRiYSIsInNhbHQiOiI5NDBiZTBlZWFhMDBmN2I1ZTgxN2JjMzE1YjhkYTI5YSIsImVtYWlsI' +
                'joiYWRtaW5AZ21haWwuY29tIiwiX192IjowLCJ1cGRhdGVkT24iOiIyMDE1LTA3LTE3VDExOjMwOjMxLjU0' +
                'NloiLCJhZG1pbiI6dHJ1ZX0.jJkuLLRhixGjJ8mOEnqlGSXkOvAMFlcOZ3A2YLQ6VF8',
            roomId = '55a8e758781779641a5526e7';
        //var controller, token, view = 'app/rooms/rooms.html';

        beforeEach(function () {
            //    module('app', bard.fakeToastr);
            //    service('auth', bard.fakeToastr);

            //creating the tester
            if (tester) {
                tester.destroy();
            }
            tester = ngMidwayTester('app');//, {/* options */})
            auth = tester.inject('auth');//log in as admin, providing the token
            auth.saveToken(adminToken);
            //module('app.rooms', bard.fakeToastr);
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
            //    currentUser: function () {
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

        //beforeEach(function() {
        //    $templateCache.put(view, '');
        //});
        //it('should map state rooms to url /rooms ', function() {
        //    expect($state.href('rooms', {})).to.equal('/rooms');
        //});
        //
        //it('should map /rooms route to rooms View template', function () {
        //    expect($state.get('rooms').templateUrl).to.equal(view);
        //});
        //
        //it('of rooms should work with $state.go', function () {
        //    $state.go('rooms');
        //    $rootScope.$apply();
        //    expect($state.is('rooms'));
        //});

        it('should have a working rooms status page', function (done) {
            tester.visit('/rooms', function () {
                expect(tester.path()).to.equal('/rooms/status');
                //expect(tester.viewElement().html()).to.contain('Video Projector');

                var current = tester.inject('$state').current;
                //var controller = current.controller;
                var template = current.templateUrl;
                var scope = tester.viewScope();
                //var scope = current.scope;
                //expect(scope.title).to.equal('Rooms status');

                expect(current.title).to.equal('Rooms status');//state title
                expect(scope.title).to.equal('Meetings:  Rooms status');//controller title ?
                expect(template).to.equal('app/rooms/rooms.mru.status.html');

                done();
            });
        });

        it('should have a working rooms list page', function (done) {
            tester.visit('/rooms/list', function () {
                expect(tester.path()).to.equal('/rooms/list');
                //expect(tester.viewElement().html()).to.contain('Video Projector');

                var current = tester.inject('$state').current;
                //var controller = current.controller;
                var template = current.templateUrl;
                var scope = tester.viewScope();
                //var scope = current.scope;
                //expect(scope.title).to.equal('Rooms status');

                expect(current.title).to.equal('Rooms list');//state title
                expect(scope.title).to.equal('Meetings:  Rooms list');//controller title ?
                expect(template).to.equal('app/rooms/rooms.mru.list.html');

                done();
            });
        });

        it('should have a working room add page', function (done) {
            tester.visit('/rooms/add', function () {
                expect(tester.path()).to.equal('/rooms/add');
                //expect(tester.viewElement().html()).to.contain('Video Projector');

                var current = tester.inject('$state').current;
                //var controller = current.controller;
                var template = current.templateUrl;
                var scope = tester.viewScope();
                //var scope = current.scope;
                //expect(scope.title).to.equal('Rooms status');

                expect(current.title).to.equal('Room add');//state title
                expect(scope.title).to.equal('Meetings:  Room add');//controller title ?
                expect(template).to.equal('app/rooms/rooms.mru.add.html');

                done();
            });
        });

        it('should have a working room edit page', function (done) {
            tester.visit('/rooms/edit/' + roomId, function () {
                expect(tester.path()).to.equal('/rooms/edit/' + roomId);
                //expect(tester.viewElement().html()).to.contain('Video Projector');

                var current = tester.inject('$state').current;
                //var controller = current.controller;
                var template = current.templateUrl;
                var scope = tester.viewScope();
                //var scope = current.scope;
                //expect(scope.title).to.equal('Rooms status');

                expect(current.title).to.equal('Room edit');//state title
                expect(scope.title).to.equal('Meetings:  Room edit');//controller title ?
                expect(template).to.equal('app/rooms/rooms.mru.edit.html');

                done();
            });
        });

        it('should have a working room details page', function (done) {
            tester.visit('/rooms/details/' + roomId, function () {
                expect(tester.path()).to.equal('/rooms/details/' + roomId);
                //expect(tester.viewElement().html()).to.contain('Video Projector');

                var current = tester.inject('$state').current;
                //var controller = current.controller;
                var template = current.templateUrl;
                var scope = tester.viewScope();
                //var scope = current.scope;
                //expect(scope.title).to.equal('Rooms status');

                expect(current.title).to.equal('Room details');//state title
                expect(scope.title).to.equal('Meetings:  Room details');//controller title ?
                expect(template).to.equal('app/rooms/rooms.mru.details.html');

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
