//(function () {
//
//    'use strict';
//
//    angular
//        .module('app.meetings')
//        .directive('roomAvailability',['$q', '$timeout', '$http', function ($q, $timeout, $http) {
//            return {
//                require: 'ngModel',
//                link: function (scope, elm, attrs, ctrl) {
//                    //var usernames = ['Jim', 'John', 'Jill', 'Jackie'];
//
//                    ctrl.$asyncValidators.roomAvailability = function (modelValue, viewValue) {
//
//                        if (ctrl.$isEmpty(modelValue)) {
//                            // consider empty model valid
//                            return $q.when();//when empty, consider as valid
//                        }
//
//                        console.log('attrs: ', attrs);
//
//                        //var def = $q.defer();
//                        //
//                        //$timeout(function () {
//                        //    // Mock a delayed response
//                        //    if (usernames.indexOf(modelValue) === -1) {
//                        //        // The username is available
//                        //        def.resolve();
//                        //    } else {
//                        //        def.reject();
//                        //    }
//                        //
//                        //}, 2000);
//
//                        return def.promise;
//                    };
//                }
//            };
//        }]);
//
//})();
