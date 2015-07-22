module.exports = function () {
    return {
        allowed: allowed
    };

    function allowed(reference, usersArr) {
        for (var i=0;i<usersArr.length;i++) {
            if (reference.hash === usersArr[i].hash) {
                return true;
            }
        }

        return false;
    }
};
