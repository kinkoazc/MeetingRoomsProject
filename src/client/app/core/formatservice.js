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
            formatMeetingAddOut: formatMeetingAddOut,

            formatRoomsList: formatRoomsList,
            formatRoomsStatusList: formatRoomsStatusList,
            formatRoomDetails: formatRoomDetails,
            formatRoomEditIn: formatRoomEditIn,
            formatRoomEditOut: formatRoomEditOut,
            formatRoomAddOut: formatRoomAddOut,

            formatUsersList: formatUsersList,
            formatUserDetails: formatUserDetails,
            formatUserEditIn: formatUserEditIn,
            formatUserEditOut: formatUserEditOut,
            formatUserAddOut: formatUserAddOut
        };

        /* MEETINGS formatters */
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
                meeting.who = (m.who[0] && m.who[0].email) || '';
                meeting.when = $filter('date')(m.when, 'd MMM y h:mm:ss a');
                meeting.duration = $filter('time')(m.duration);
                meeting.where = m.room[0].name + ' - ' + m.room[0].location;
                meeting.allowed = m.allowed.map(function (user) {
                    return user.email;
                }).join(',<br />');

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
                return user.email;
            }).join(',<br />');

            return meeting;
        }

        function formatMeetingEditIn(originalMeeting) {
            var meeting = {};

            meeting.description = originalMeeting.description || '';
            meeting.who = originalMeeting.who[0]._id || '';
            meeting.whenDate = new Date(originalMeeting.when);
            meeting.whenStartTime = new Date(originalMeeting.when);
            meeting.whenEndTime = new Date(originalMeeting.when + originalMeeting.duration);
            meeting.where = originalMeeting.room[0]._id || '';
            meeting.editors = originalMeeting.allowed.map(function (user) {
                return user._id;
            });

            return meeting;
        }

        function formatMeetingEditOut(mtg) {
            var meeting = {};

            meeting.description = mtg.description;
            if (mtg.editors.indexOf(mtg.who) === -1) {
                mtg.editors.push(mtg.who);
            }
            meeting.allowed = mtg.editors;
            meeting.who = mtg.who;
            meeting.when = Math.round(mtg.whenDate / 86400000) * 86400000 + mtg.whenStartTime % 86400000;
            meeting.duration = mtg.whenEndTime - mtg.whenStartTime;
            meeting.room = mtg.where;

            return meeting;
        }

        function formatMeetingAddOut(mtg) {
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
            if (mtg.editors.indexOf(mtg.who) === -1) {
                mtg.editors.push(mtg.who);
            }
            meeting.allowed = mtg.editors;
            meeting.who = mtg.who._id;
            meeting.when = Math.round(mtg.whenDate / 86400000) * 86400000 + mtg.whenStartTime % 86400000;
            meeting.duration = mtg.whenEndTime - mtg.whenStartTime;
            meeting.room = mtg.where;

            return meeting;
        }


        /* ROOMS formatters */
        function formatRoomsList(originalRooms) {
            if (!angular.isArray(originalRooms)) {
                return originalRooms;
            }

            var rooms = [], room = {};

            originalRooms.forEach(function (r) {
                room = {};

                room.id = r._id;
                room.location = r.location || '';
                room.name = r.name || '';
                room.size = r.size || '';
                room.hasConferenceEquipment = (r.hasConferenceEquipment || false) ? 'Yes' : 'No';
                room.hasVideoProjector = (r.hasVideoProjector || false) ? 'Yes' : 'No';

                rooms.push(room);
            });

            return rooms;
        }

        function formatRoomsStatusList(originalRooms) {
            if (!angular.isArray(originalRooms)) {
                return originalRooms;
            }

            var rooms = [], room = {};

            originalRooms.forEach(function (r) {
                room = {};

                room.id = r._id;
                room.location = r.location || '';
                room.name = r.name || '';
                room.size = r.size || '';
                room.hasConferenceEquipment = (r.hasConferenceEquipment || false) ? 'Yes' : 'No';
                room.hasVideoProjector = (r.hasVideoProjector || false) ? 'Yes' : 'No';
                room.occupiedBetween = r.occupiedBetween;

                rooms.push(room);
            });

            return rooms;
        }

        function formatRoomDetails(originalRoom) {
            var room = {};

            room.location = originalRoom.location || '';
            room.name = originalRoom.name || '';
            room.size = originalRoom.size || '';
            room['has conference equipment'] = (originalRoom.hasConferenceEquipment || false) ? 'Yes' : 'No';
            room['has video projector'] = (originalRoom.hasVideoProjector || false) ? 'Yes' : 'No';

            return room;
        }

        function formatRoomEditIn(originalRoom) {
            var room = {};

            room.location = originalRoom.location || '';
            room.name = originalRoom.name || '';
            room.size = originalRoom.size || '';
            room.hasConferenceEquipment = originalRoom.hasConferenceEquipment || false;
            room.hasVideoProjector = originalRoom.hasVideoProjector || false;

            return room;
        }

        function formatRoomEditOut(rm) {
            var room = {};

            //room.description = rm.description;
            //if (rm.editors.indexOf(rm.who) === -1) {
            //    rm.editors.push(rm.who);
            //}
            //room.allowed = rm.editors;
            //room.who = rm.who;
            //room.when = Math.round(rm.whenDate / 86400000) * 86400000 + rm.whenStartTime % 86400000;
            //room.duration = rm.whenEndTime - rm.whenStartTime;
            //room.room = rm.where;

            room.location = rm.location || '';
            room.name = rm.name || '';
            room.size = rm.size || '';
            room.hasConferenceEquipment = rm.hasConferenceEquipment || false;
            room.hasVideoProjector = rm.hasVideoProjector || false;

            return room;
        }

        function formatRoomAddOut(rm) {
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

            var room = {};

            //room.description = mtg.description;
            //if (mtg.editors.indexOf(mtg.who) === -1) {
            //    mtg.editors.push(mtg.who);
            //}
            //room.allowed = mtg.editors;
            //room.who = mtg.who._id;
            //room.when = Math.round(mtg.whenDate / 86400000) * 86400000 + mtg.whenStartTime % 86400000;
            //room.duration = mtg.whenEndTime - mtg.whenStartTime;
            //room.room = mtg.where;

            room.location = rm.location || '';
            room.name = rm.name || '';
            room.size = rm.size || '';
            room.hasConferenceEquipment = rm.hasConferenceEquipment || false;
            room.hasVideoProjector = rm.hasVideoProjector || false;

            return room;
        }


        /* USERS formatters */
        function formatUsersList(originalUsers) {
            if (!angular.isArray(originalUsers)) {
                return originalUsers;
            }

            var users = [], user = {};

            originalUsers.forEach(function (u) {
                //_id: "55a8e757781779641a5526e5"
                //admin: true
                //email: "admin@gmail.com"
                //hash: "953fb91763a97c41071de72ce94e638c1b9745a949994f
                // 607a854097f0f475f88c6a19a6192657280eb9c0c2efdab9ab0369131f3c124dc2755a5e3aa19ed4ba"
                //salt: "940be0eeaa00f7b5e817bc315b8da29a"
                //updatedOn: "2015-07-17T11:30:31.546Z"

                user = {};

                user.id = u._id;
                user.admin = (u.admin || false) ? 'Yes' : 'No';
                user.email = u.email || '';
                user.createdUpdatedOn = $filter('date')(u.updatedOn, 'd MMM y h:mm:ss a');//new Date(u.updatedOn);

                users.push(user);
            });

            return users;
        }

        function formatUserDetails(originalUser) {
            var user = {};

            user.admin = (originalUser.admin || false) ? 'Yes' : 'No';
            user.email = originalUser.email || '';
            user['Created/Updated on'] = $filter('date')(originalUser.updatedOn, 'd MMM y h:mm:ss a');

            return user;
        }

        function formatUserEditIn(originalUser) {
            var user = {};

            user.admin = originalUser.admin || false;
            user.email = originalUser.email || '';

            return user;
        }

        function formatUserEditOut(us) {
            var user = {};

            //user.description = rm.description;
            //if (rm.editors.indexOf(rm.who) === -1) {
            //    rm.editors.push(rm.who);
            //}
            //user.allowed = rm.editors;
            //user.who = rm.who;
            //user.when = Math.round(rm.whenDate / 86400000) * 86400000 + rm.whenStartTime % 86400000;
            //user.duration = rm.whenEndTime - rm.whenStartTime;
            //user.user = rm.where;

            user.admin = us.admin || false;
            user.email = us.email || '';

            return user;
        }

        function formatUserAddOut(us) {

            var user = {};

            user.admin = (us.admin || false);
            user.email = us.email || '';
            user.password = us.password || '';

            return user;
        }


        /* UTILS */
        function isAmongUsers(user, index, users) {
            return (user.email === auth.currentUser().email);
        }
    }
})();

