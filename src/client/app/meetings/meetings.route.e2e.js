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

    describe('Testing Meeting list/add routes', function () {
        it('should have a working /meetings/list route', function () {
            browser.get('/meetings/list');
            browser.getLocationAbsUrl().then(function (url) {
                expect(element.all(by.css('div[ui-view]>mru')).count()).toBe(1);

                expect(url).toEqual('/meetings/list');
            });
        });

        it('should have a working /meetings/add route', function () {
            browser.get('/meetings/add');
            browser.getLocationAbsUrl().then(function (url) {
                expect(element.all(by.css('div[ui-view]>mru')).count()).toBe(1);

                expect(url).toEqual('/meetings/add');
            });
        });
    });

    describe('Testing Meeting details/edit routes', function () {
        beforeEach(function () {
            browser.get('/meetings/list');
            //browser.waitForAngular();
            browser.getLocationAbsUrl().then(function (url) {
                element(by.repeater('meeting in vml.meetings').row(0))
                    .element(by.css('td>a'))
                    .click()
                    .then(function () {
                        //console.log('click completed');
                    });
            });
        });

        it('should have a working /meetings/details/... route', function () {
            //browser.get('/meetings/list');
            //browser.getLocationAbsUrl().then(function (url) {
            //    element.all(by.css('table>tbody>tr td'))
            //        .get(1)
            //        .click()
            //        .then(function () {
            browser.getLocationAbsUrl().then(function (url) {
                expect(element.all(by.css('div[ui-view]>mru')).count()).toBe(1);

                expect(url).toMatch(/^\/meetings\/details\/.+$/);
            });
            //        });
            //});
        });

        it('should have a working /meetings/edit/... route', function () {
            //browser.get('/meetings/list');
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

                            expect(url).toMatch(/^\/meetings\/edit\/.+$/);
                        });
                    });
            });

        });
    });

    afterEach(function () {
        browser.get('/logout');
    });

});
