var apiRoutes = require('express').Router();
var four0four = require('./utils/404')();
var User = require('./models/user');
var Meeting = require('./models/meeting');
var Room = require('./models/room');
var _ = require('lodash');
var async = require('async');
var jwt = require('jsonwebtoken');
var config = require('./config');
//var data = require('./data');

//router.get('/people', getPeople);
//router.get('/person/:id', getPerson);

// API ROUTES -------------------
// route to register a user (POST http://localhost:8001/api/register)
apiRoutes.post('/register', function (req, res, next) {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({success: false, message: 'Please fill out all fields'});
    }

    var user = new User();

    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.admin = (req.body.admin || false);

    user.save(function (err) {
        if (err) {
            return next(err);
        }

        return res.status(200).json({
            success: true,
            message: 'Enjoy your token!',
            email: user.email,
            token: user.generateJWT()
        });
    });
});

// route to authenticate a user (POST http://localhost:8001/api/authenticate)
apiRoutes.post('/authenticate', function (req, res) {

    // find the user
    User.findOne({
        email: req.body.email
    }, function (err, user) {

        if (err) {
            throw err;
        }

        if (!user) {
            res.status(401).json({success: false, message: 'Authentication failed. User not found.'});
        } else if (user) {

            // check if password matches
            if (!user.validPassword(req.body.password)) {
                res.status(401).json({success: false, message: 'Authentication failed. Wrong password.'});
            } else {
                // if user is found and password is right
                // create a token
                var token = user.generateJWT();

                // return the information including token as JSON
                res.status(200).json({
                    success: true,
                    message: 'Enjoy your token!',
                    email: user.email,
                    token: token
                });
            }
        }

    });
});

/* public route */
//get rooms availability(considering that .get(meetings) and .get(rooms) are restricted routes)
apiRoutes.get('/room-status', function (req, res) {

    async.parallel([
        function (callback) {
            //get rooms
            Room
                .find({})
                .exec(function (err, rooms) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, rooms);
                    }
                });
        },
        function (callback) {
            Meeting
                .find({})
                .populate('who')
                .populate('allowed')
                .populate('room')
                .exec(function (err, meetings) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, meetings);
                    }
                });
        }
    ], function (err, results) {
        var rooms = _.map(results[0], function (room) {
            room._doc.occupiedBetween = [];
            return room._doc;
        });

        var meetings = _.map(results[1], function (meeting) {
            return meeting._doc;
        });

        _.each(meetings, function (meeting) {
            _.each(rooms, function (room) {
                if (meeting.room['0']._doc._id.id === room._id.id) {
                    room.occupiedBetween.push({
                        start: meeting.when,
                        end: meeting.when + meeting.duration
                    });
                }
            });
        });

        res.json(rooms);
    });


    //get meetings


    //process the rooms availability


    //return

});

/* protected routes */
// route middleware to verify a token
apiRoutes.use(function (req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp

        token = token.replace('Bearer ', '').trim();//strip 'Bearer '

        //console.log('token: ', token);
        //console.log('config.secret: ', config.secret);
        //console.log('typeof jwt: ', typeof jwt);

        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                console.log('err: ', err);
                return res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

// route to show a random message (GET http://localhost:8001/api/)
apiRoutes.get('/', function (req, res) {
    res.json({message: 'Welcome to the coolest API on earth!'});
});

// route to return all users (GET http://localhost:8001/api/users)
//apiRoutes.get('/users', function(req, res) {
//    User.find({}, function(err, users) {
//        res.json(users);
//    });
//});

/* MEETINGS routes */
//apiRoutes.route('/meetings/:id?')
apiRoutes.get('/meetings', function (req, res, next) {// /meetings (get all meetings)

    //var meetingId = req.params.id;
    //
    //if (meetingId) {/* GET one meeting case */
    //    next();
    //}

    console.log('-------- getting meetings');

    //check authorization level

    Meeting
        .find({})
        .populate('who')
        .populate('allowed')
        .populate('room')
        .exec(function (err, meetings) {
            if (err) {
                console.log(err);
            } else {
                res.status(200).json(meetings);
            }
        });
});

apiRoutes.post('/meetings', function (req, res, next) {// /meetings (create a meeting)
    //check authorization level

    console.log('-------- adding meeting');

    var meeting = new Meeting({
        description: req.body.description,
        who: req.body.who,
        when: req.body.when,
        duration: req.body.duration,
        allowed: req.body.allowed,
        room: req.body.room
    });

    meeting.save(function (err, m) {
        if (err) {
            console.log(err);
        } else {
            //console.log('meeting added: ', m);
            res.status(200).json(m);
        }
    });

});

apiRoutes.get('/meetings/:id', function (req, res, next) {// /meetings/:id (get a meeting)

    //check authorization level

    console.log('-------- getting meeting');

    var meetingId = req.params.id;

    Meeting
        .findOne({
            _id: meetingId
        })
        .populate('who')
        .populate('allowed')
        .populate('room')
        .exec(function (err, meeting) {
            if (err) {
                console.log(err);
            } else {
                res.status(200).json(meeting);
            }
        });
});

apiRoutes.put('/meetings/:id', function (req, res, next) {// /meetings/:id (edit a meeting)
    //check authorization level(done in .use() part, above)(only the standard and admin users will be let through)

    console.log('-------- updating meeting');

    var meetingId = req.params.id;

    Meeting
        .findOne({
            _id: meetingId
        })
        .populate('who')
        .populate('allowed')
        .populate('room')
        .exec(function (err, meeting) {
            if (err) {
                console.log(err);
            } else if (meeting) {
                //check if user is among the editors/owner
                //...

                _.extend(meeting, req.body);

                meeting.save(function (err, m) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('-------- meeting updated successfully');
                        res.status(200).json(m);
                    }
                });
            }

            //res.status(304).json(meeting);
        });
});

apiRoutes.delete('/meetings/:id', function (req, res, next) {// /meetings/:id (delete a meeting)
    //next(new Error('not implemented'));

    //check authorization level
    //check if user is among the editors/owner

    console.log('------ deleting meeting');

    var meetingId = req.params.id;

    if (meetingId) {
        Meeting.findOneAndRemove({_id: meetingId}, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('------ meeting deleted');
                res.status(200).json({message: 'Meeting deleted'});
            }
        });
    }

});

/* ROOMS routes */
apiRoutes.route('/rooms/:id?')
    .get(function (req, res, next) {// /meetings (get all meetings)

        //check authorization level

        Room
            .find({})
            .exec(function (err, rooms) {
                if (err) {
                    console.log(err);
                } else {
                    res.status(200).json(rooms);
                }
            });

    })
    .post(function (req, res, next) {// /meetings (create a meeting)
        //check authorization level

        //var meeting = new Meeting({
        //    description: req.body.description,
        //    who: req.body.who._id,
        //    when: req.body.when,
        //    duration: req.body.duration,
        //    allowed: req.body.allowedIds,
        //    room: req.body.room._id
        //});
        //
        //meeting.save(function (err, m) {
        //    if (err) {
        //        console.log(err);
        //    } else {
        //        res.status(200).json(m);
        //    }
        //});

    })
    .get(function (req, res, next) {// /meetings/:id (get a meeting)

        //check authorization level

        //var meetingId = req.params.id;
        //
        //Meeting
        //    .findOne({
        //        _id: meetingId
        //    })
        //    .populate('who')
        //    .populate('allowed')
        //    .populate('room')
        //    .exec(function (err, meeting) {
        //        if (err) {
        //            console.log(err);
        //        } else {
        //            res.status(200).json(meeting);
        //        }
        //    });

    })
    .put(function (req, res, next) {// /meetings/:id (edit a meeting)

        //check authorization level(done in .use() part, above)(only the standard and admin users will be let through)

        //var meetingId = req.params.id;
        //
        //Meeting
        //    .findOne({
        //        _id: meetingId
        //    })
        //    .populate('who')
        //    .populate('allowed')
        //    .populate('room')
        //    .exec(function (err, meeting) {
        //        if (err) {
        //            console.log(err);
        //        } else if (meeting) {
        //            //check if user is among the editors/owner
        //
        //            _.extend(meeting, req.body);
        //
        //            meeting.save(function (err, m) {
        //                if (err) {
        //                    console.log(err);
        //                } else {
        //                    res.status(200).json(m);
        //                }
        //            });
        //        }
        //
        //        //res.status(304).json(meeting);
        //    });

    })
    .delete(function (req, res, next) {// /meetings/:id (delete a meeting)
        //next(new Error('not implemented'));

        //check authorization level
        //check if user is among the editors/owner

        //Meeting.findOneAndRemove({_id: req.body.id}, function (err) {
        //    if (err) {
        //        console.log(err);
        //    } else {
        //        res.status(200).json({message: 'Meeting deleted'});
        //    }
        //});

    });

/* USERS routes */
apiRoutes.route('/users/:id?')
    .get(function (req, res, next) {// /meetings (get all meetings)

        //check authorization level

        User
            .find({})
            .exec(function (err, users) {
                if (err) {
                    console.log(err);
                } else {
                    res.status(200).json(users);
                }
            });

    })
    .post(function (req, res, next) {// /meetings (create a meeting)
        //check authorization level

        //var meeting = new Meeting({
        //    description: req.body.description,
        //    who: req.body.who._id,
        //    when: req.body.when,
        //    duration: req.body.duration,
        //    allowed: req.body.allowedIds,
        //    room: req.body.room._id
        //});
        //
        //meeting.save(function (err, m) {
        //    if (err) {
        //        console.log(err);
        //    } else {
        //        res.status(200).json(m);
        //    }
        //});

    })
    .get(function (req, res, next) {// /meetings/:id (get a meeting)

        //check authorization level

        //var meetingId = req.params.id;
        //
        //Meeting
        //    .findOne({
        //        _id: meetingId
        //    })
        //    .populate('who')
        //    .populate('allowed')
        //    .populate('room')
        //    .exec(function (err, meeting) {
        //        if (err) {
        //            console.log(err);
        //        } else {
        //            res.status(200).json(meeting);
        //        }
        //    });

    })
    .put(function (req, res, next) {// /meetings/:id (edit a meeting)

        //check authorization level(done in .use() part, above)(only the standard and admin users will be let through)

        //var meetingId = req.params.id;
        //
        //Meeting
        //    .findOne({
        //        _id: meetingId
        //    })
        //    .populate('who')
        //    .populate('allowed')
        //    .populate('room')
        //    .exec(function (err, meeting) {
        //        if (err) {
        //            console.log(err);
        //        } else if (meeting) {
        //            //check if user is among the editors/owner
        //
        //            _.extend(meeting, req.body);
        //
        //            meeting.save(function (err, m) {
        //                if (err) {
        //                    console.log(err);
        //                } else {
        //                    res.status(200).json(m);
        //                }
        //            });
        //        }
        //
        //        //res.status(304).json(meeting);
        //    });

    })
    .delete(function (req, res, next) {// /meetings/:id (delete a meeting)
        //next(new Error('not implemented'));

        //check authorization level
        //check if user is among the editors/owner

        //Meeting.findOneAndRemove({_id: req.body.id}, function (err) {
        //    if (err) {
        //        console.log(err);
        //    } else {
        //        res.status(200).json({message: 'Meeting deleted'});
        //    }
        //});

    });

/* 404 route */
apiRoutes.get('/*', four0four.notFoundMiddleware);

module.exports = apiRoutes;

//////////////

//function getPeople(req, res, next) {
//    res.status(200).send(data.people);
//}
//
//function getPerson(req, res, next) {
//    var id = +req.params.id;
//    var person = data.people.filter(function(p) {
//        return p.id === id;
//    })[0];
//
//    if (person) {
//        res.status(200).send(person);
//    } else {
//        four0four.send404(req, res, 'person ' + id + ' not found');
//    }
//}
