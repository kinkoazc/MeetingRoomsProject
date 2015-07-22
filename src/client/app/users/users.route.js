(function () {
    'use strict';

    angular
        .module('app.users')
        .run(appRun);

    appRun.$inject = ['$q', '$stateParams', '$timeout', '$state', 'dataservice', 'routerHelper', 'formatservice'];
    /* @ngInject */
    function appRun($q, $stateParams, $timeout, $state, dataservice, routerHelper, formatservice) {
        routerHelper.configureStates(getStates($q, $stateParams,
            $timeout, $state, dataservice, formatservice));//, null, ['/users', '/users/list']
    }

    function getStates($q, $stateParams, $timeout, $state, dataservice, formatservice) {
        return [
            {
                state: 'users',
                config: {
                    url: '/users',
                    templateUrl: 'app/users/users.html',
                    controller: 'UsersController',
                    controllerAs: 'vm',
                    title: 'Users',
                    abstract: true,
                    settings: {
                        nav: 1,
                        //inMainMenu: true,
                        content: '<i class="fa fa-briefcase"></i> Users'
                    }
                    //onEnter: function ($state) {
                    //    console.log('entering users');
                    //    $state.go('users.list');
                    //},
                    //onExit: function () {
                    //    console.log('exiting users');
                    //},
                    //resolve: {
                    //    users: function () {
                    //        //console.log('resolve users');
                    //        //var users = [
                    //        //    {
                    //        //        description: 'Scrum user',
                    //        //        who: 'User One',
                    //        //        when: 1488323623006,
                    //        //        duration: 6600000,
                    //        //        where: 'User 45',
                    //        //        allowed: 'User One, User Three',
                    //        //        id: 1231241
                    //        //    },
                    //        //    {
                    //        //        description: 'Investors user',
                    //        //        who: 'User Three',
                    //        //        when: 1498323623006,
                    //        //        duration: 10200000,
                    //        //        where: 'User 30',
                    //        //        allowed: 'User Three',
                    //        //        id: 1231256
                    //        //    }
                    //        //];
                    //        //
                    //        //var deferred=$q.defer();
                    //        //
                    //        //$timeout(function () {
                    //        //    deferred.resolve(users);
                    //        //}, 100);
                    //        //
                    //        //return deferred.promise;//$q.when(users);
                    //
                    //        return dataservice.gettingUsers();
                    //
                    //    }
                        //,
                        //user: function ($stateParams) {
                        //    if ($stateParams.id) {
                        //        return this.users().when(
                        //            function (data) {
                        //                for (var i = 0; i < data.length; i++) {
                        //                    if ($stateParams.id == data[i].id + '") {
                        //                        return data[i];
                        //                    }
                        //                }
                        //
                        //                return {};
                        //            }
                        //        )
                        //    } else {
                        //        return {};
                        //    }
                        //}
                    //}
                }
            },
            {
                state: 'users.list',
                config: {
                    url: '/list',
                    templateUrl: 'app/users/users.mru.list.html',
                    title: 'Users list',
                    settings: {
                        nav: 2,
                        inMainMenu: true,
                        authLevel: 3,
                        content: '<i class="fa fa-briefcase"></i> Users'
                    },
                    resolve: {
                        users: function () {
                            //console.log('resolve users');
                            //var users = [
                            //    {
                            //        description: 'Scrum user',
                            //        who: 'User One',
                            //        when: 1488323623006,
                            //        duration: 6600000,
                            //        where: 'User 45',
                            //        allowed: 'User One, User Three',
                            //        id: 1231241
                            //    },
                            //    {
                            //        description: 'Investors user',
                            //        who: 'User Three',
                            //        when: 1498323623006,
                            //        duration: 10200000,
                            //        where: 'User 30',
                            //        allowed: 'User Three',
                            //        id: 1231256
                            //    }
                            //];
                            //
                            //var deferred=$q.defer();
                            //
                            //$timeout(function () {
                            //    deferred.resolve(users);
                            //}, 100);
                            //
                            //return deferred.promise;//$q.when(users);

                            return dataservice.gettingUsers();

                        }
                        //,
                        //user: function ($stateParams) {
                        //    if ($stateParams.id) {
                        //        return this.users().when(
                        //            function (data) {
                        //                for (var i = 0; i < data.length; i++) {
                        //                    if ($stateParams.id == data[i].id + '") {
                        //                        return data[i];
                        //                    }
                        //                }
                        //
                        //                return {};
                        //            }
                        //        )
                        //    } else {
                        //        return {};
                        //    }
                        //}
                    },
                    controller: ['$scope', 'users', function ($scope, users) {
                        var vml = this;

                        vml.users = [];
                        users.$promise.then(function (data) {
                            //$scope.$parent.vm.users
                            vml.users= formatservice.formatUsersList(data);
                        });

                    }],
                    controllerAs: 'vml'
                }
            },
            {
                state: 'users.add',
                config: {
                    url: '/add',
                    templateUrl: 'app/users/users.mru.add.html',
                    title: 'User add',
                    //resolve: {
                    //    users: function () {
                    //
                    //        //if ($stateParams.id) {
                    //        //    for (var i = 0; i < users.length; i++) {
                    //        //        if ($stateParams.id === users[i]._id) {
                    //        //            return formatservice.formatUserDetails(users[i]);
                    //        //        }
                    //        //    }
                    //        //}
                    //
                    //        return dataservice.gettingUsers();
                    //    },
                    //    users: function () {
                    //
                    //        //if ($stateParams.id) {
                    //        //    for (var i = 0; i < users.length; i++) {
                    //        //        if ($stateParams.id === users[i]._id) {
                    //        //            return formatservice.formatUserDetails(users[i]);
                    //        //        }
                    //        //    }
                    //        //}
                    //
                    //        return dataservice.gettingUsers();
                    //    }
                    //},
                    controller: ['auth', function (auth) {
                        var vma = this;

                        vma.addUserFormCb = addUserFormCb;

                        /* TODO erase/comment this; for testing purposes only */
                        vma.user = {};
                        vma.user.name = 'User ' + Math.round(Math.random() * 10000);
                        vma.user.location = Math.round(Math.random() * 15)+'th Floor, Europe House';
                        vma.user.size = Math.round(Math.random() * 100);
                        vma.user.hasConferenceEquipment = Math.round(Math.random()) ? true:false;
                        vma.user.hasVideoProjector = Math.round(Math.random()) ? true:false;

                        function addUserFormCb() {
                            vma.user = {};
                        }
                    }],
                    controllerAs: 'vma',
                    settings: {
                        authLevel: 3
                    }
                }
            },
            {
                state: 'users.details',
                config: {
                    url: '/details/:id',
                    templateUrl: 'app/users/users.mru.details.html',
                    title: 'User details',
                    resolve: {
                        user: function ($stateParams, formatservice) {//users,
                            if ($stateParams.id) {

                                //get only one user
                                return dataservice.gettingUser($stateParams.id);

                                //return users.$promise.then(function (data) {
                                //    for (var i = 0; i < data.length; i++) {
                                //        if ($stateParams.id === data[i]._id) {
                                //            return formatservice.formatUserDetails(data[i]);
                                //        }
                                //    }
                                //});
                            }
                        }
                    },
                    controller: ['$scope', 'user', function ($scope, user) {
                        var vmd = this;

                        user.$promise.then(function (data) {
                            vmd.user = formatservice.formatUserDetails(data);
                        });

                    }],
                    controllerAs: 'vmd',
                    settings: {
                        authLevel: 3
                    }
                }
            },
            {
                state: 'users.edit',
                config: {
                    url: '/edit/:id',
                    templateUrl: 'app/users/users.mru.edit.html',
                    title: 'User edit',
                    resolve: {
                        user: function ($stateParams, formatservice) {
                            if ($stateParams.id) {

                                //return users.$promise.then(function (data) {
                                //    for (var i = 0; i < data.length; i++) {
                                //        if ($stateParams.id === data[i]._id) {
                                //            return formatservice.formatUserEditIn(data[i]);
                                //        }
                                //    }
                                //});

                                //get only one user
                                return dataservice.gettingUser($stateParams.id);

                            }
                        }
                        //users: function () {
                        //    //if ($stateParams.id) {
                        //    //    for (var i = 0; i < users.length; i++) {
                        //    //        if ($stateParams.id === users[i]._id) {
                        //    //            return formatservice.formatUserDetails(users[i]);
                        //    //        }
                        //    //    }
                        //    //}
                        //
                        //    return dataservice.gettingUsers();
                        //},
                        //users: function () {
                        //    //if ($stateParams.id) {
                        //    //    for (var i = 0; i < users.length; i++) {
                        //    //        if ($stateParams.id === users[i]._id) {
                        //    //            return formatservice.formatUserDetails(users[i]);
                        //    //        }
                        //    //    }
                        //    //}
                        //
                        //    return dataservice.gettingUsers();
                        //}
                    },
                    controller: ['$scope', '$state', 'user',
                        function ($scope, $state, user) {//, users, users
                        var vme = this;

                        vme.editUserFormCb = editUserFormCb;

                        user.$promise.then(function (data) {
                            vme.user = formatservice.formatUserEditIn(data);
                        });

                        //vme.user = user;
                        //vme.users = users;
                        //vme.users = users;

                        function editUserFormCb() {
                            //$state.reload();
                            $state.go('users.details');
                            //var who = angular.copy(vme.user.who);
                            //vme.user = {};
                            //vme.user.who = who;
                        }
                    }],
                    controllerAs: 'vme',
                    settings: {
                        authLevel: 3
                    }
                }
            }
        ];
    }
})();
