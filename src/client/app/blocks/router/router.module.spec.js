/* jshint -W117, -W030 */
describe('Testing Module', function() {
    describe('blocks.router module:', function() {

        var module;
        before(function() {
            module = angular.module('blocks.router');
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
            it('should have ui.router as a dependency', function() {
                expect(hasModule('ui.router')).to.equal(true);
            });

            it('should have blocks.logger as a dependency', function() {
                expect(hasModule('blocks.logger')).to.equal(true);
            });

            it('should have 2 dependencies', function() {
                expect(deps.length).to.equal(2);
            });
        });
    });
});
