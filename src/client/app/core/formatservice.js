(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('formatservice', formatservice);

    formatservice.$inject = ['$state', '$filter', 'logger', 'auth'];
    /* @ngInject */
    function formatservice($state, $filter, logger, auth) {
        return {
            formatMeetingsList: formatMeetingsList,
            formatMeetingDetails: formatMeetingDetails,
            formatMeetingEdit: formatMeetingEdit
        };

        function formatMeetingsList(originalMeetings) {
            var meetings = [], meeting = {};

            originalMeetings.forEach(function (m) {
                meeting = {};

                meeting.id = m._id;
                meeting.canEdit = m.allowed.some(isAmongUsers) && !m.who.some(isAmongUsers);
                meeting.isCreator = m.who.some(isAmongUsers);

                meeting.description = m.description || '';
                meeting.who = m.who[0].email || '';
                meeting.when = $filter('date')(m.when, 'd MMM y h:mm:ss a');
                meeting.duration = $filter('time')(m.duration);
                meeting.where = m.room[0].name + ' - ' + m.room[0].location;
                meeting.allowed = m.allowed.map(function (user) {
                    return user.email
                }).join(', ');

                meetings.push(meeting);
            });

            return meetings;
        }

        function formatMeetingDetails(originalMeeting) {
            var meeting = {};

            meeting.description = originalMeeting.description || '';
            meeting.creator = originalMeeting.who[0].email || '';
            meeting.when = $filter('date')(originalMeeting.when, 'd MMM y h:mm:ss a');
            meeting.duration = $filter('time')(originalMeeting.duration);
            meeting.where = originalMeeting.room[0].name + ' - ' + originalMeeting.room[0].location;
            meeting.editors = originalMeeting.allowed.map(function (user) {
                return user.email
            }).join(', ');

            return meeting;
        }

        function formatMeetingEdit(originalMeeting) {
            var meeting = {};

            meeting.description = originalMeeting.description || '';
            meeting.who = originalMeeting.who[0].email || '';
            meeting.whenDate = new Date(Math.floor(originalMeeting.when / 86400000) * 86400000);
            meeting.whenStartTime = new Date(originalMeeting.when % 86400000);
            meeting.whenEndTime = new Date(originalMeeting.when % 86400000 + originalMeeting.duration);
            //meeting.duration = $filter('time')(meeting.whenEndTime-meeting.whenStartTime);
            meeting.where = originalMeeting.room[0].name || '';
            meeting.editors = originalMeeting.allowed.map(function (user) {
                return user.email;
            });

            return meeting;
        }

        function isAmongUsers(user, index, users) {
            return (user.email === auth.currentUser().email);
        }
    }
})();

