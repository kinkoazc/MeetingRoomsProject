angular
    .module('app.core')
    .filter('time', function () {
        return function (inputText) {
            if (angular.isNumber(inputText)) {
                inputText = parseInt(inputText) / 1000;

                var days, hours, minutes;

                days = Math.floor(inputText / (24 * 60 * 60));
                inputText = inputText - days * 24 * 60 * 60;
                hours = Math.floor(inputText / (60 * 60));
                inputText = inputText - hours * 60 * 60;
                minutes = Math.floor(inputText / 60);

                return days + ' d, ' + hours + ' h, ' + minutes + ' m';
            }
        };
    });
