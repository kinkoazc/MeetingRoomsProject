/* jshint -W117, -W030 */
describe('Unit: Testing formatservice', function () {

    beforeEach(module('app'));

    it('should have a working formatservice',
        inject(['formatservice', function (formatservice) {

            var originalRooms = [
                    {
                        __v: 0,
                        _id: '55a8e758781779641a5526e7',
                        hasConferenceEquipment: true,
                        hasVideoProjector: false,
                        location: '6th Floor, Europe House',
                        name: 'Room 13',
                        size: 30,
                        updatedOn: '2015-07-17T11:30:32.224Z'
                    },
                    {
                        __v: 0,
                        _id: '55a8e758781779641a5526e8',
                        hasConferenceEquipment: false,
                        hasVideoProjector: true,
                        location: '5th Floor, Europe House',
                        name: 'Room 67',
                        size: 50,
                        updatedOn: '2015-07-17T11:30:32.228Z'
                    }
                ],
                returnedRooms = [
                    {
                        id: '55a8e758781779641a5526e7',
                        hasConferenceEquipment: 'Yes',
                        hasVideoProjector: 'No',
                        location: '6th Floor, Europe House',
                        name: 'Room 13',
                        size: 30
                    },
                    {
                        id: '55a8e758781779641a5526e8',
                        hasConferenceEquipment: 'No',
                        hasVideoProjector: 'Yes',
                        location: '5th Floor, Europe House',
                        name: 'Room 67',
                        size: 50
                    }
                ];

            expect(formatservice.formatRoomsList(originalRooms)).to.deep.equal(returnedRooms);
        }]));
});
