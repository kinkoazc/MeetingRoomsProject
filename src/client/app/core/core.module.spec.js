/* jshint -W117, -W030 */
describe('Testing Module', function() {
    describe('app.core module:', function() {

        var module;
        before(function() {
            module = angular.module('app.core');
        });

        it('should be registered', function() {
            expect(module).not.to.equal(null);
        });

        describe('Dependencies:', function() {

            var deps;
            var hasModule = function(m) {
                return deps.indexOf(m) >= 0;
            };
            before(function() {
                deps = module.value('appName').requires;
            });
            //you can also test the module's dependencies
            it('should have ngAnimate as a dependency', function() {
                expect(hasModule('ngAnimate')).to.equal(true);
            });

            it('should have ngSanitize as a dependency', function() {
                expect(hasModule('ngSanitize')).to.equal(true);
            });

            it('should have ngResource as a dependency', function() {
                expect(hasModule('ngResource')).to.equal(true);
            });

            it('should have blocks.exception as a dependency', function() {
                expect(hasModule('blocks.exception')).to.equal(true);
            });

            it('should have blocks.logger as a dependency', function() {
                expect(hasModule('blocks.logger')).to.equal(true);
            });

            it('should have blocks.router as a dependency', function() {
                expect(hasModule('blocks.router')).to.equal(true);
            });

            it('should have blocks.compile as a dependency', function() {
                expect(hasModule('blocks.compile')).to.equal(true);
            });

            it('should have ui.router as a dependency', function() {
                expect(hasModule('ui.router')).to.equal(true);
            });

            it('should have ngplus as a dependency', function() {
                expect(hasModule('ngplus')).to.equal(true);
            });

            it('should have 9 dependencies', function() {
                expect(deps.length).to.equal(9);
            });
        });
    });
});
