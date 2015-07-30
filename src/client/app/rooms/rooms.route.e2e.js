/* jshint -W117, -W030 */
describe('E2E: Testing Routes', function () {

    beforeEach(function () {
        browser.get('/login');
        browser.getLocationAbsUrl('/login').then(function (url) {
                //TODO use sendKeys to fill the inputs(XHR, slow)
                //var emailElem = element(by.css('form[name=loginForm] input#loginEmail')),
                //    passElem = element(by.css('form[name=loginForm] input#loginPassword'));
                //emailElem.clear();
                //passElem.clear();
                //emailElem.sendKeys('admin@gmail.com');
                //passElem.sendKeys('password');

                element.all(by.css('form[name=loginForm] button[type=submit]')).first().click();
            }
        );
    });

    describe('Testing Room list/add/status routes', function () {
        it('should jump to the /rooms/status path when / is accessed', function () {
            browser.get('/rooms/status');
            browser.getLocationAbsUrl().then(function (url) {
                expect(element.all(by.css('div[ui-view]>mru')).count()).toBe(1);

                expect(url).toEqual('/rooms/status');
            });
        });

        it('should have a working /rooms/list route', function () {
            browser.get('/rooms/list');
            browser.getLocationAbsUrl().then(function (url) {
                expect(element.all(by.css('div[ui-view]>mru')).count()).toBe(1);

                expect(url).toEqual('/rooms/list');
            });
        });

        it('should have a working /rooms/add route', function () {
            browser.get('/rooms/add');
            browser.getLocationAbsUrl().then(function (url) {
                expect(element.all(by.css('div[ui-view]>mru')).count()).toBe(1);

                expect(url).toEqual('/rooms/add');
            });
        });
    });

    describe('Testing Room details/edit routes', function () {
        beforeEach(function () {
            browser.get('/rooms/list');
            //browser.waitForAngular();
            browser.getLocationAbsUrl().then(function (url) {
                element(by.repeater('room in vml.rooms').row(0))
                    .element(by.css('td>a'))
                    .click()
                    .then(function () {
                        //console.log('click completed');
                    });
            });
        });

        it('should have a working /rooms/details/... route', function () {
            //browser.get('/rooms/list');
            //browser.getLocationAbsUrl().then(function (url) {
            //    element.all(by.css('table>tbody>tr td'))
            //        .get(1)
            //        .click();

            browser.getLocationAbsUrl().then(function (url) {
                expect(element.all(by.css('div[ui-view]>mru')).count()).toBe(1);

                expect(url).toMatch(/^\/rooms\/details\/.+$/);
            });

            //            });
        });

        it('should have a working /rooms/edit/... route', function () {
            //browser.get('/rooms/list');
            //browser.getLocationAbsUrl().then(function (url) {
            //    element.all(by.css('table>tbody>tr td'))
            //        .get(1)
            //        .click();

            browser.getLocationAbsUrl().then(function (url) {
                element.all(by.css('mru button[type=button]'))
                    .get(1)
                    .click()
                    .then(function () {
                        browser.getLocationAbsUrl().then(function (url) {
                            expect(element.all(by.css('div[ui-view]>mru')).count()).toBe(1);

                            expect(url).toMatch(/^\/rooms\/edit\/.+$/);
                        });
                    });
            });
        });
    });

    afterEach(function () {
        browser.get('/logout');
    });

});

//});
