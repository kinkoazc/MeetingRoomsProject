/* jshint -W117, -W030 */
describe('E2E: Testing Routes', function () {

    beforeEach(function () {
        browser.get('/login');
        browser.getLocationAbsUrl().then(function (url) {
                //TODO use sendKeys to fill the inputs(XHR, slow)
                //var emailElem = element(by.css('form[name=loginForm] input#loginEmail')),
                //    passElem = element(by.css('form[name=loginForm] input#loginPassword'));
                //emailElem.clear();
                //passElem.clear();
                //emailElem.sendKeys('admin@gmail.com');
                //passElem.sendKeys('password');

                element.all(by.css('form[name=loginForm] button[type=submit]')).first().click();
                //browser.driver.sleep(2000);
            }
        );
    });

    describe('Testing User list/add routes', function () {
        it('should have a working /users/list route', function () {
            browser.get('/users/list');
            browser.getLocationAbsUrl().then(function (url) {
                //browser.waitForAngular();

                expect(element.all(by.css('div[ui-view]>mru')).count()).toBe(1);

                expect(url).toEqual('/users/list');

                //expect(element('div[ui-view]').getText()).toContain('Users list');
            });
        });

        it('should have a working /users/add route', function () {
            browser.get('/users/add');
            browser.getLocationAbsUrl().then(function (url) {
                //browser.waitForAngular();
                expect(element.all(by.css('div[ui-view]>mru')).count()).toBe(1);

                expect(url).toEqual('/users/add');
            });
        });
    });

    describe('Testing User details/edit routes', function () {
        beforeEach(function () {

            browser.get('/users/list');
            //browser.waitForAngular();
            browser.getLocationAbsUrl().then(function (url) {
                element(by.repeater('user in vml.users').row(0))
                    .element(by.css('td>a'))
                    .click()
                    .then(function () {
                        //console.log('click completed');
                    });
            });
        });

        it('should have a working /users/details/... route', function () {
            browser.getLocationAbsUrl().then(function (url) {
                expect(element.all(by.css('div[ui-view]>mru')).count()).toBe(1);

                expect(url).toMatch(/^\/users\/details\/.+$/);
            });
        });

        it('should have a working /users/edit/... route', function () {
            browser.getLocationAbsUrl().then(function (url) {
                element.all(by.css('mru button[type=button]'))
                    .get(1)
                    .click()
                    .then(function () {
                        browser.getLocationAbsUrl().then(function (url) {
                            expect(element.all(by.css('div[ui-view]>mru')).count()).toBe(1);

                            expect(url).toMatch(/^\/users\/edit\/.+$/);
                        });
                    });
            });
        });
    });

    afterEach(function () {
        browser.get('/logout');
    });
});
