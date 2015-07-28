/* jshint -W117, -W030 */
describe('Testing Module', function() {
    describe('blocks.logger module:', function() {

        var module;
        before(function() {
            module = angular.module('blocks.logger');
        });

        it('should be registered', function() {
            expect(module).not.to.equal(null);
        });

        describe('Dependencies:', function() {

            var deps;
            //var hasModule = function(m) {
            //    return deps.indexOf(m) >= 0;
            //};
            before(function() {
                deps = module.value('appName').requires;
            });
            //you can also test the module's dependencies

            it('should not have any dependencies', function() {
                expect(deps.length).to.equal(0);
            });
        });
    });
});
