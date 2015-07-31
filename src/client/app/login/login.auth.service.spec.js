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
