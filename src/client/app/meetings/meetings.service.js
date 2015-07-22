angular
    .module('app.meetings')
    .factory('Meeting', Meeting);

Meeting.$inject = ['$resource'];
/* @ngInject */
function Meeting($resource) {

    //var meeting = {}, meetings = [];

    return {
        //getMeeting: getMeeting,
        //setMeeting: setMeeting,
        //getMeetings: getMeetings,
        //setMeetings: setMeetings,
        resource: getResource()
    };

    function getResource() {
        return $resource('/api/meetings/:id', null, {
            'update': {method: 'PUT'}
        });
    }

    //function getMeeting() {
    //    return meeting;
    //}
    //
    //function setMeeting(m) {
    //    meeting = m;
    //}
    //
    //function getMeetings() {
    //    return meetings;
    //}
    //
    //function setMeetings(ms) {
    //    meetings = ms;
    //}

}

