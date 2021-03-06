/* Help configure the state-base ui.router */
(function () {
    'use strict';

    angular
        .module('blocks.router')
        .provider('routerHelper', routerHelperProvider);

    routerHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
    /* @ngInject */
    function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
        /* jshint validthis:true */
        var config = {
            docTitle: undefined,
            resolveAlways: {}
        };

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false//will cause problems with IE9-
        });

        function configure(cfg) {
            angular.extend(config, cfg);
        }

        RouterHelper.$inject = ['$location', '$rootScope', '$state', 'logger'];
        /* @ngInject */
        function RouterHelper($location, $rootScope, $state, logger) {

            var handlingStateChangeError = false,
                hasOtherwise = false,
                stateCounts = {
                    errors: 0,
                    changes: 0
                },
                service = {
                    configureStates: configureStates,
                    getStates: getStates,
                    stateCounts: stateCounts
                };

            init();

            return service;

            ///////////////

            function configureStates(states, otherwisePath) {//, whenPath
                states.forEach(function (state) {
                    state.config.resolve =
                        angular.extend(state.config.resolve || {}, config.resolveAlways);
                    $stateProvider.state(state.state, state.config);
                });

                if (otherwisePath && !hasOtherwise) {
                    hasOtherwise = true;
                    $urlRouterProvider.otherwise(otherwisePath);
                }
                //
                //if (whenPath) {
                //    $urlRouterProvider.when(whenPath[0], whenPath[1]);
                //}
            }

            function handleRoutingErrors() {
                // Route cancellation:
                // On routing error, go to the dashboard.
                // Provide an exit clause if it tries to do it twice.
                $rootScope.$on('$stateChangeError',
                    function (event, toState, toParams, fromState, fromParams, error) {
                        if (handlingStateChangeError) {
                            return;
                        }
                        stateCounts.errors++;
                        handlingStateChangeError = true;
                        var destination = (toState &&
                            (toState.title || toState.name || toState.loadedTemplateUrl)) ||
                            'unknown target';
                        var msg = 'Error routing to ' + destination + '. ' +
                            (error.data || '') + '. <br/>' + (error.statusText || '') +
                            ': ' + (error.status || '');
                        logger.warning(msg, [toState]);
                        $location.path('/404');
                    }
                );
            }

            function init() {
                handleRoutingErrors();
                updateDocTitle();
            }

            function getStates() {
                return $state.get();
            }

            function updateDocTitle() {
                $rootScope.$on('$stateChangeSuccess',
                    function (event, toState, toParams, fromState, fromParams) {
                        stateCounts.changes++;
                        handlingStateChangeError = false;
                        $rootScope.title = config.docTitle + ' ' + (toState.title || ''); // data bind to <title>
                    }
                );
            }
        }

        return {
            configure: configure,
            $get: RouterHelper
        };
    }
})();
