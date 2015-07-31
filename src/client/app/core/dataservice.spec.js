/* jshint -W117, -W030 */
describe('Unit: Testing dataservice service', function () {
    var $httpBackend, dataservice;

    beforeEach(module('app'));

    beforeEach(inject(['$httpBackend', 'dataservice', function (_$httpBackend_, dts) {
        $httpBackend = _$httpBackend_;
        dataservice = dts;

        $httpBackend
            .whenGET('/api/meetings')
            .respond(function (method, url, data) {
                return [200, [{one: 'one'}, {two: 'two'}], {}];
            });

        $httpBackend
            .whenGET('/api/room-status')
            .respond(function (method, url, data) {
                return [200, [], {}];
            });

    }]));

    it('should have a working dataservice service', function (done) {
        var startDate = +new Date(),
            data = dataservice.gettingMeetings();

        $httpBackend.flush();

        var interval = setInterval(function () {
            if (typeof data === 'object' &&
                data.length !== undefined &&
                data.length > 0) {
                expect(data.length).to.equal(2);
                clearInterval(interval);
                done();
            } else if ((+new Date()) - startDate > 1500) {
                expect(data.length).to.equal(2);
                clearInterval(interval);
                done();
            }
        }, 100);
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});

xdescribe('Midway: Testing dataservice', function () {//TODO solve issue?
    var tester;

    beforeEach(function () {
        if (tester) {
            tester.destroy();
        }
        tester = ngMidwayTester('app');
    });

    it('should verify the dataservice functionality', function (done) {
        this.timeout(20000);//set mocha timeout value to >2000 ms(which is the default value)
        var dataservice = tester.inject('dataservice'),
            startDate = +new Date(),
            roomsStatus = dataservice.gettingRoomsStatus(),
            interval = setInterval(function () {
                console.log('roomsStatus: ', roomsStatus);
                //console.log('typeof roomsStatus.$promise: ', typeof roomsStatus.$promise);

                if (typeof roomsStatus === 'object' &&
                    roomsStatus.length !== undefined &&
                    roomsStatus.length > 0) {
                    clearInterval(interval);
                    expect(roomsStatus.length).to.be.above(0);
                    done();
                } else if ((+new Date()) - startDate > 10000) {
                    console.log('dataservice verification expired!');
                    clearInterval(interval);
                    expect(roomsStatus.length).to.be.above(0);
                    done();
                }
            }, 100);

        //auth.findVideo(youtubeID, false,
        //    function (q, data) {
        //        expect(data).not.to.equal(null);
        //        expect(data.id).to.equal(youtubeID);
        //        done();
        //    }
        //);
    });
});
