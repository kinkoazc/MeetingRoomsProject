(function () {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$state', 'dataservice', 'logger'];
    /* @ngInject */
    function LoginController($state, dataservice, logger) {
        var vm = this;

        vm.login = login;
        vm.register = register;
        vm.title = 'Login';

        activate();

        function activate() {
            logger.info('Activated Login View');

            //signIn form
            angular.element('form[name=loginForm]')
                .find('[type=email]')
                .eq(0)
                .val('admin@gmail.com');

            angular.element('form[name=loginForm]')
                .find('[type=password]')
                .eq(0)
                .val('password');

            //register form
            angular.element('form[name=registerForm]')
                .find('[type=email]')
                .eq(0)
                .val('admin@gmail.com' + Math.floor(Math.random() * 10000));

            angular.element('form[name=registerForm]')
                .find('[type=password]')
                .eq(0)
                .val('password');
        }

        function login(e) {
            e.preventDefault();

            dataservice.logging({email: e.target['email'].value, password: e.target['password'].value})
                .then(function (data) {
                    if (data.success === true) {
                        $state.go('login');
                    }
                }, function (reason) {

                });
        }

        function register(e) {
            e.preventDefault();

            dataservice.registering({email: e.target['email'].value, password: e.target['password'].value})
                .then(function (data) {
                    if (data.success === true) {
                        $state.go('login');
                    }
                }, function (reason) {

                });
        }
    }
})();
