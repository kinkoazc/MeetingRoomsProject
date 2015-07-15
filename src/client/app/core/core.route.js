(function() {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    /* @ngInject */
    function appRun($templateCache, routerHelper) {
        routerHelper.configureStates(getStates(), '/meetings');

        //$templateCache.put('test.html', 'Hello {{ test.user.name }}!');
    }

    function getStates() {
        return [
            {
                state: '404',
                config: {
                    url: '/404',
                    templateUrl: 'app/core/404.html',
                    title: '404'
                }
            }
        ];
    }

})();
