(function () {
    'use strict';

    angular
        .module('blocks.compile')
        .directive('bindHtmlCompile', ['$compile', 'auth', function ($compile, auth) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    scope.$watch(function () {
                        return scope.$eval(attrs.bindHtmlCompile);
                    }, function (value) {
                        element.html(value);
                        $compile(element.contents())(scope);
                    });
                }
            };
        }]);
}());

