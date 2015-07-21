angular
    .module('app.users')
    .factory('User', User);

User.$inject = ['$resource'];
/* @ngInject */
function User($resource) {

    return $resource('/api/users/:id', null,
        {
            'update': {method: 'PUT'}
        });
}
