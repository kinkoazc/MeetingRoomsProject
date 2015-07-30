/* jshint -W117, -W030 */
describe('E2E: Testing Routes', function () {
    describe('Testing Login/Logout routes', function () {
        it('should have a working /login & /logout route', function () {
            browser.get('/login');
            browser.getLocationAbsUrl().then(function (url) {
                expect(element.all(by.css('div[ui-view]>section')).count()).toBe(1);
                expect(url).toEqual('/login');

                element.all(by.css('form[name=loginForm] button[type=submit]')).first().click().then(function () {
                    browser.get('/logout');

                    browser.getLocationAbsUrl().then(function (url) {
                        expect(element.all(by.css('div[ui-view]>section')).count()).toBe(1);

                        expect(url).toEqual('/login');
                    });
                });
            });
        });
    });
});
