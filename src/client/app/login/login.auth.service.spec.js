/* jshint -W117, -W030 */
xdescribe('Unit: Testing auth service', function () {

    beforeEach(module('app'));

    it('should have a working auth service',
        inject(['auth', function (auth) {

            expect(typeof auth.saveToken).to.equal('function');
            expect(typeof auth.getToken).to.equal('function');
            expect(auth.isLoggedIn()).to.equal(false);
            expect(auth.currentUser()).to.equal(undefined);
            expect(auth.isAuthorized()).to.equal(false);
        }]));
});
