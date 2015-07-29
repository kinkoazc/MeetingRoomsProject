/* jshint -W117, -W030 */
describe('E2E: Testing Routes', function () {

    beforeEach(function () {
        browser.get('/login');
        browser.getLocationAbsUrl('/login').then(function (url) {
                //TODO use sendKeys to fill the inputs
                element.all(by.css('form[name=loginForm] button[type=submit]')).first().click();
            }
        );
    });

    describe('Testing Room routes', function () {
        it('should jump to the /rooms/status path when / is accessed', function () {
            browser.get('/rooms/status');
            browser.getLocationAbsUrl().then(function (url) {
                expect(url).toEqual('/rooms/status');
            });
        });

        it('should have a working /rooms/list route', function () {
            browser.get('/rooms/list');
            browser.getLocationAbsUrl().then(function (url) {
                expect(url).toEqual('/rooms/list');
            });
        });

        it('should have a working /rooms/add route', function () {
            browser.get('/rooms/add');
            browser.getLocationAbsUrl().then(function (url) {
                expect(url).toEqual('/rooms/add');
            });
        });

        it('should have a working /rooms/details/... route', function () {
            browser.get('/rooms/list');
            browser.getLocationAbsUrl().then(function (url) {
                element.all(by.css('table>tbody>tr td'))
                    .get(1)
                    .click();

                browser.getLocationAbsUrl().then(function (url) {
                    expect(url).toMatch(/^\/rooms\/details\/.+$/);
                });

            });
        });

        it('should have a working /rooms/edit/... route', function () {
            browser.get('/rooms/list');
            browser.getLocationAbsUrl().then(function (url) {
                element.all(by.css('table>tbody>tr td'))
                    .get(1)
                    .click();

                browser.getLocationAbsUrl().then(function (url) {
                    element.all(by.css('mru button[type=button]'))
                        .get(1)
                        .click();

                    browser.getLocationAbsUrl().then(function (url) {
                        expect(url).toMatch(/^\/rooms\/edit\/.+$/);
                    });
                });

            });
        });

        afterEach(function () {
            browser.get('/logout');
        });

    });

});
