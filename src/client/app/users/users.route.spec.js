/* jshint -W117, -W030 */
describe('users routes', function () {
    describe('state', function () {
        var tester,
            adminToken = 'eyJ0eXAiOiJKV1QiLCJhbGciO' +
                'iJIUzI1NiJ9.eyJleHAiOjE0MzgyNDQ2OTAsIl9pZCI6IjU1YThlNzU3NzgxNzc5NjQxYTU1MjZlNSIsI' +
                'mhhc2giOiI5NTNmYjkxNzYzYTk3YzQxMDcxZGU3MmNlOTRlNjM4YzFiOTc0NWE5NDk5OTRmNjA3YTg1NDA' +
                '5N2YwZjQ3NWY4OGM2YTE5YTYxOTI2NTcyODBlYjljMGMyZWZkYWI5YWIwMzY5MTMxZjNjMTI0ZGMyNzU1YT' +
                'VlM2FhMTllZDRiYSIsInNhbHQiOiI5NDBiZTBlZWFhMDBmN2I1ZTgxN2JjMzE1YjhkYTI5YSIsImVtYWlsI' +
                'joiYWRtaW5AZ21haWwuY29tIiwiX192IjowLCJ1cGRhdGVkT24iOiIyMDE1LTA3LTE3VDExOjMwOjMxLjU0' +
                'NloiLCJhZG1pbiI6dHJ1ZX0.jJkuLLRhixGjJ8mOEnqlGSXkOvAMFlcOZ3A2YLQ6VF8',
            userId = '55a8e757781779641a5526e5';//admin
        //var controller, token, view = 'app/users/users.html';

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
            //module('app.users', bard.fakeToastr);
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

        it('should have a working users list page', function (done) {
            tester.visit('/users/list', function () {
                expect(tester.path()).to.equal('/users/list');
                //expect(tester.viewElement().html()).to.contain('Video Projector');

                var current = tester.inject('$state').current;
                //var controller = current.controller;
                var template = current.templateUrl;
                var scope = tester.viewScope();
                //var scope = current.scope;
                //expect(scope.title).to.equal('Users status');

                //console.log('current.resolve.users: ', current.resolve.users().then(function () {
                //
                //}));

                expect(current.title).to.equal('Users list');//state title
                expect(scope.title).to.equal('Meetings:  Users list');//controller title ?
                expect(template).to.equal('app/users/users.mru.list.html');

                done();
            });
        });

        it('should have a working user add page', function (done) {
            tester.visit('/users/add', function () {
                expect(tester.path()).to.equal('/users/add');
                //expect(tester.viewElement().html()).to.contain('Video Projector');

                var current = tester.inject('$state').current;
                //var controller = current.controller;
                var template = current.templateUrl;
                var scope = tester.viewScope();
                //var scope = current.scope;
                //expect(scope.title).to.equal('Users status');

                expect(current.title).to.equal('User add');//state title
                expect(scope.title).to.equal('Meetings:  User add');//controller title ?
                expect(template).to.equal('app/users/users.mru.add.html');

                done();
            });
        });

        it('should have a working user edit page', function (done) {
            tester.visit('/users/edit/' + userId, function () {
                expect(tester.path()).to.equal('/users/edit/' + userId);
                //expect(tester.viewElement().html()).to.contain('Video Projector');

                var current = tester.inject('$state').current;
                //var controller = current.controller;
                var template = current.templateUrl;
                var scope = tester.viewScope();
                //var scope = current.scope;
                //expect(scope.title).to.equal('Users status');

                expect(current.title).to.equal('User edit');//state title
                expect(scope.title).to.equal('Meetings:  User edit');//controller title ?
                expect(template).to.equal('app/users/users.mru.edit.html');

                done();
            });
        });

        it('should have a working user details page', function (done) {
            tester.visit('/users/details/' + userId, function () {
                expect(tester.path()).to.equal('/users/details/' + userId);
                //expect(tester.viewElement().html()).to.contain('Video Projector');

                var current = tester.inject('$state').current;
                //var controller = current.controller;
                var template = current.templateUrl;
                var scope = tester.viewScope();
                //var scope = current.scope;
                //expect(scope.title).to.equal('Users status');

                expect(current.title).to.equal('User details');//state title
                expect(scope.title).to.equal('Meetings:  User details');//controller title ?
                expect(template).to.equal('app/users/users.mru.details.html');

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
