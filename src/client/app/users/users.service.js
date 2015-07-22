angular
    .module('app.users')
    .factory('User', User);

User.$inject = ['$resource'];
/* @ngInject */
function User($resource) {

    //var user = {}, users = [];

    return {
        //getUser: getUser,
        //setUser: setUser,
        //getUsers: getUsers,
        //setUsers: setUsers,
        resource: getResource()
    };

    function getResource() {
        return $resource('/api/users/:id', null, {
            'update': {method: 'PUT'}
        });
    }

    //function getUser() {
    //    return user;
    //}
    //
    //function setUser(m) {
    //    user = m;
    //}
    //
    //function getUsers() {
    //    return users;
    //}
    //
    //function setUsers(ms) {
    //    users = ms;
    //}

}

