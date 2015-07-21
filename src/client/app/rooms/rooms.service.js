angular
    .module('app.rooms')
    .factory('Room', Room);

Room.$inject = ['$resource'];
/* @ngInject */
function Room($resource) {

    return $resource('/api/rooms/:id', null,
        {
            'update': {method: 'PUT'}
        });
}
