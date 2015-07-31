/* jshint -W117, -W030 */
describe('Unit: Testing auth service', function () {

    beforeEach(module('app'));

    it('should have a working auth service',
        inject(['auth', function (auth) {

            expect(typeof auth.saveToken).to.equal('function');
            expect(typeof auth.getToken).to.equal('function');
            expect(typeof auth.logOut).to.equal('function');
            auth.saveToken(window.testingGlobals.token);
            expect(auth.isLoggedIn()).to.equal(true);
            expect(auth.currentUser().email).to.equal('admin@gmail.com');
            expect(auth.isAuthorized(3)).to.equal(true);
            auth.logOut();
            expect(auth.isLoggedIn()).to.equal(false);
            expect(auth.currentUser()).to.equal(undefined);
            expect(auth.isAuthorized()).to.equal(false);

        }]));
});

describe('Midway: Testing auth service', function () {
    var tester;

    beforeEach(function () {
        if (tester) {
            tester.destroy();
        }
        tester = ngMidwayTester('app');
    });

    it('should verify the auth service functionality', function () {
        var auth = tester.inject('auth');
        expect(auth).not.to.equal(null);

        auth.saveToken(window.testingGlobals.token);

        expect(auth.isLoggedIn()).to.equal(true);

        auth.logOut();

        expect(auth.isLoggedIn()).to.equal(false);
        //auth.findVideo(youtubeID, false,
        //    function (q, data) {
        //        expect(data).not.to.equal(null);
        //        expect(data.id).to.equal(youtubeID);
        //        done();
        //    }
        //);
    });
});
