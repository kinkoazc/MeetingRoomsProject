(function () {
    'use strict';

    angular
        .module('app.users')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['$rootScope', '$state', '$window',
        '$filter', '$timeout', 'auth', 'logger', 'routerHelper', 'dataservice', 'formatservice'];
    /* @ngInject */
    /*jshint maxparams: 15 */
    function UsersController($rootScope, $state, $window,
                             $filter, $timeout, auth, logger, routerHelper, dataservice, formatservice) {

        var vm = this,
            states = routerHelper.getStates();
        vm.deleteUser = deleteUser;
        vm.isCurrent = isCurrent;
        vm.isAuthorized = auth.isAuthorized;
        //vm.users = [];
        //vm.user = {};
        vm.navRoutes = [];
        vm.sendAddForm = sendAddForm;
        vm.sendEditForm = sendEditForm;
        vm.title = 'Users';
        //vm.user = {};

        activate();

        function activate() {
            logger.info('Activated Users View');

            $rootScope.$on('$stateChangeSuccess', function () {
                //console.log('state changed successfully');

                //if ($state.params.id) {
                //    for (var i = 0; i < vm.users.length; i++) {
                //        if ($state.params.id === vm.users[i].id + '') {
                //            vm.user = vm.users[i];
                //        }
                //    }
                //
                //    if (angular.equals({}, vm.user)) {
                //        $state.go('users.list');
                //    }
                //}

                //if (angular.equals({}, vm.user)) {
                //    vm.user=user;
                //}
            });

            $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
                getNavRoutes(toState);

                if (fromParams && fromParams.id && !toParams.id) {
                    toParams.id = fromParams.id;
                }

            });

            getNavRoutes();
            //vm.users = formatservice.formatUsersList(users);
            //vm.user = auth.currentUser();
        }

        function getNavRoutes(toState) {
            var current = toState || $state.current;

            if (!angular.isObject(current) || current.name.indexOf('users.') > -1 &&
                current.url.indexOf(':id') === -1) {
                getUsersNavRoutes();
            } else if (angular.isObject(current) && current.name.indexOf('users.') > -1 &&
                current.url.indexOf(':id') > -1) {
                getUserNavRoutes();
            }
        }

        function getUsersNavRoutes() {
            vm.navRoutes = states.filter(function (r) {
                return (r.name.indexOf('users.') === 0 && r.url.indexOf(':id') === -1);
            });
        }

        function getUserNavRoutes() {
            vm.navRoutes = states.filter(function (r) {
                return (r.name.indexOf('users.') === 0 && r.url.indexOf(':id') > -1);
            });
        }

        function isCurrent(route) {
            if (!route.title || !$state.current || !$state.current.title) {
                return '';
            }

            var menuName = route.title;
            return $state.current.title.substr(0, menuName.length) === menuName ? 'active' : '';
        }

        //function getUsers() {
        //    vm.users = [
        //        {
        //            description: "Scrum user",
        //            who: "User One",
        //            when: "17.07.2015, 11:00-12:50",
        //            duration: "1h 50min",
        //            where: "User 45",
        //            allowed: "User One, User Three",
        //            id: 1231241
        //        },
        //        {
        //            description: "Investors user",
        //            who: "User Three",
        //            when: "17.07.2015, 13:00-15:50",
        //            duration: "2h 50min",
        //            where: "User 30",
        //            allowed: "User Three",
        //            id: 1231256
        //        }
        //    ];
        //}

        function sendEditForm(e, user, cb) {
            e.preventDefault();

            //console.log('Edit user form submitted! ', user);
            dataservice.editingUser(formatservice.formatUserEditOut(user)).$promise.then(function (data) {
                if (data.message === 'Not authorized.') {
                    logger.error('You are not authorized to edit this user.', data, 'Error!');
                } else {
                    logger.success('User updated successfully.', data, 'Success!');
                }

                // reset the form
                cb();
                //e.target.reset();
            }, function (reason) {
                logger.error('User not updated.', reason, 'Error!');
            });

            return false;
        }

        function sendAddForm(e, user, cb) {
            e.preventDefault();


            if (user.password !== user.password2) {
                logger.warning('Passwords are not the same!', user, 'Password error');
                return;
            }

            //console.log('Add user form submitted! ', formatservice.formatUserAddOut(user));
            dataservice.addingUser(formatservice.formatUserAddOut(user)).$promise.then(function (data) {
                if (data.message === 'Not authorized.') {
                    logger.error('You are not authorized to add this user.', data, 'Error!');
                } else {
                    logger.success('User saved successfully.', data, 'Success!');
                }

                // reset the form
                cb();
                //e.target.reset();
            }, function (reason) {
                logger.error('User not saved.', reason, 'Error!');
            });

            return false;
        }

        function deleteUser(id) {
            if ($window.confirm('Are you sure you want to delete the entry?')) {
                dataservice.deletingUser(id).$promise.then(function (data) {
                    if (data.message === 'Not authorized.') {
                        logger.error('You are not authorized to delete this user.', data, 'Error!');
                    } else {
                        logger.success('User deleted successfully.', data, 'Success!');
                    }


                    if ($state.is('users.list')) {
                        $state.reload();
                    } else {
                        $state.go('users.list');
                    }
                }, function (reason) {
                    logger.error('User not deleted.', reason, 'Error!');
                });
            }
        }
    }
})();
