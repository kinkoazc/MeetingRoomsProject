angular
    .module('app.meetings')
    .factory('Meeting', Meeting);

Meeting.$inject = ['$resource'];
/* @ngInject */
function Meeting($resource) {

    return $resource('/api/meetings/:id', null,
        {
            'update': { method:'PUT' }
        });

}

