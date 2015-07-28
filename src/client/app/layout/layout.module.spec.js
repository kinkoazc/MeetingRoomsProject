/* jshint -W117, -W030 */
describe('Testing Module', function() {
    describe('app.layout module:', function() {

        var module;
        before(function() {
            module = angular.module('app.layout');
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
            it('should have app.core as a dependency', function() {
                expect(hasModule('app.core')).to.equal(true);
            });

            it('should have 1 dependency', function() {
                expect(deps.length).to.equal(1);
            });
        });
    });
});
