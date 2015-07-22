(function () {
    'use strict';

    //sources:
    // http://stackoverflow.com/questions/19726179/how-to-make-ng-bind-html-compile-angularjs-code
    // https://docs.angularjs.org/api/ng/service/$compile

    angular
        .module('blocks.compile')
        .directive('bindHtmlCompile', ['$compile', 'auth', function ($compile, auth) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    scope.$watch(function () {
                        // watch the 'compile' expression for changes
                        return scope.$eval(attrs.bindHtmlCompile);//evaluate expression in the current scope
                    }, function (value) {
                        // when the 'compile' expression changes
                        // assign it into the current DOM
                        element.html(value);

                        // compile the new DOM and link it to the current
                        // scope.
                        // NOTE: we only compile .childNodes so that
                        // we don't get into infinite loop compiling ourselves
                        $compile(element.contents())(scope);
                    });
                }
            };
        }]);
}());

