angular
    .module('app.rooms')
    .factory('Room', Room);

Room.$inject = ['$resource'];
/* @ngInject */
function Room($resource) {

    //var room = {}, rooms = [];

    return {
        //getRoom: getRoom,
        //setRoom: setRoom,
        //getRooms: getRooms,
        //setRooms: setRooms,
        resource: getResource()
    };

    function getResource() {
        return $resource('/api/rooms/:id', null, {
            'update': {method: 'PUT'}
        });
    }

    //function getRoom() {
    //    return room;
    //}
    //
    //function setRoom(m) {
    //    room = m;
    //}
    //
    //function getRooms() {
    //    return rooms;
    //}
    //
    //function setRooms(ms) {
    //    rooms = ms;
    //}

}

