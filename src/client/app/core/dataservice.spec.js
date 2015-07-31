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
