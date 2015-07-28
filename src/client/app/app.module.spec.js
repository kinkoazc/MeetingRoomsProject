/* jshint -W117, -W030 */
describe('Testing Module', function() {
    describe('app module:', function() {

        var module;
        before(function() {
            module = angular.module('app');
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

            it('should have app.meetings as a dependency', function() {
                expect(hasModule('app.meetings')).to.equal(true);
            });

            it('should have app.rooms as a dependency', function() {
                expect(hasModule('app.rooms')).to.equal(true);
            });

            it('should have app.login as a dependency', function() {
                expect(hasModule('app.login')).to.equal(true);
            });

            it('should have app.users as a dependency', function() {
                expect(hasModule('app.users')).to.equal(true);
            });

            it('should have app.layout as a dependency', function() {
                expect(hasModule('app.layout')).to.equal(true);
            });

            it('should have 6 dependencies', function() {
                expect(deps.length).to.equal(6);
            });
        });
    });
});
