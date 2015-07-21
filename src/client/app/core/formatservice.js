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
            formatMeetingEditIn: formatMeetingEditIn,
            formatMeetingEditOut: formatMeetingEditOut,
            formatMeetingAddOut: formatMeetingAddOut
        };

        function formatMeetingsList(originalMeetings) {
            if (!angular.isArray(originalMeetings)) {
                return originalMeetings;
            }

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

        function formatMeetingEditIn(originalMeeting) {
            var meeting = {};

            meeting.description = originalMeeting.description || '';
            meeting.who = originalMeeting.who[0].email || '';
            meeting.whenDate = new Date(originalMeeting.when);
            meeting.whenStartTime = new Date(originalMeeting.when);
            meeting.whenEndTime = new Date(originalMeeting.when + originalMeeting.duration);
            meeting.where = originalMeeting.room[0].name || '';
            meeting.editors = originalMeeting.allowed.map(function (user) {
                return user.email;
            });

            return meeting;
        }

        function formatMeetingEditOut(meeting) {
            //var meeting = {};
            //
            //meeting.description = originalMeeting.description || '';
            //meeting.who = originalMeeting.who[0].email || '';
            //meeting.whenDate = new Date(originalMeeting.when);
            //meeting.whenStartTime = new Date(originalMeeting.when);
            //meeting.whenEndTime = new Date(originalMeeting.when + originalMeeting.duration);
            //meeting.where = originalMeeting.room[0].name || '';
            //meeting.editors = originalMeeting.allowed.map(function (user) {
            //    return user.email;
            //});
            //
            //return meeting;
        }

        function formatMeetingAddOut(mtg) {
            //console.log(mtg);
            /*
            IN:
             description [String]
             editors [[String, $oid]]
             who [String, $oid]
            whenDate [Date]
            whenEndTime [Date]
            whenStartTime [Date]
            where [String, $oid]

            OUT:
             description [String]
             allowed [[$oid]]
             who [$oid]
             when [Number, ms]
             duration [Number, ms]
             room [$oid]
            */


            var meeting = {};

            meeting.description = mtg.description;
            meeting.allowed = mtg.editors;
            meeting.who = mtg.who;
            meeting.when = Math.round(mtg.whenDate/86400000)*86400000 + mtg.whenStartTime%86400000;
            meeting.duration = mtg.whenEndTime - mtg.whenStartTime;
            meeting.room = mtg.where;

            console.log('meeting: ',meeting);

            //meeting.description = originalMeeting.description || '';
            //meeting.who = originalMeeting.who[0].email || '';
            //meeting.whenDate = new Date(originalMeeting.when);
            //meeting.whenStartTime = new Date(originalMeeting.when);
            //meeting.whenEndTime = new Date(originalMeeting.when + originalMeeting.duration);
            //meeting.where = originalMeeting.room[0].name || '';
            //meeting.editors = originalMeeting.allowed.map(function (user) {
            //    return user.email;
            //});

            return meeting;
        }

        function isAmongUsers(user, index, users) {
            return (user.email === auth.currentUser().email);
        }
    }
})();

