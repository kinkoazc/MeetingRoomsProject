var apiRoutes = require('express').Router();
var four0four = require('./utils/404')();
var User = require('./models/user');
var Meeting = require('./models/meeting');
var Room = require('./models/room');
var _ = require('lodash');
var async = require('async');
var jwt = require('jsonwebtoken');
var config = require('./config');
var funcs = require('./utils/funcs')();
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
            //get meetings
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
            room._doc.occupiedBetween = [];//add field
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

        res.status(200).json(rooms);
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
                ////console.log('----- meeting: ', meeting);
                //console.log('----- meeting.allowed.length: ', meeting.allowed.length);
                //console.log('----- meeting.who.length: ', meeting.who.length);
                //console.log('----- concat meetings length: ', _(meeting.allowed).concat(meeting.who).value().length);
                ////console.log('----- req.decoded: ', req.decoded);

                //check if user is among the editors/owner
                if (funcs.allowed(req.decoded, _(meeting.allowed).concat(meeting.who).value())) {
                    _.extend(meeting, req.body);

                    meeting.save(function (err, m) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('-------- meeting updated successfully');
                            res.status(200).json(m);
                        }
                    });
                } else {
                    res.status(403).send({
                        success: false,
                        message: 'Not authorized.'
                    });
                }
            }

            //res.status(304).json(meeting);
        });
});

apiRoutes.delete('/meetings/:id', function (req, res, next) {// /meetings/:id (delete a meeting)
    //next(new Error('not implemented'));

    //check authorization level
    //check if user is among the editors/owner

    var meetingId = req.params.id;

    if (meetingId) {

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
                    if (funcs.allowed(req.decoded, _(meeting.allowed).concat(meeting.who).value())) {
                        meeting.remove(function (err) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log('------ meeting deleted');
                                res.status(200).json({message: 'Meeting deleted'});
                            }
                        });
                    } else {
                        console.log('------ meeting deletion not allowed');
                        res.status(403).send({
                            success: false,
                            message: 'Not authorized.'
                        });
                    }
                }
            });

        //Meeting.findOneAndRemove({_id: meetingId}, function (err) {
        //    if (err) {
        //        console.log(err);
        //    } else {
        //        console.log('------ meeting deleted');
        //        res.status(200).json({message: 'Meeting deleted'});
        //    }
        //});
    }

});


apiRoutes.get('/rooms', function (req, res, next) {// /rooms (get all rooms)

    //var meetingId = req.params.id;
    //
    //if (meetingId) {/* GET one room case */
    //    next();
    //}

    console.log('-------- getting rooms');

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
});

/* USERS routes */
apiRoutes.get('/users', function (req, res, next) {// /users (get all users)

    //var meetingId = req.params.id;
    //
    //if (meetingId) {/* GET one user case */
    //    next();
    //}

    console.log('-------- getting users');

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
});


/* ADMIN only routes */
apiRoutes.use(function (req, res, next) {

    if (!req.decoded || !req.decoded.admin) {
        return res.status(403).send({
            success: false,
            message: 'Not authorized.'
        });
    } else {
        next();
    }
});


/* ROOMS routes */
apiRoutes.post('/rooms', function (req, res, next) {// /rooms (create a room)
    //check authorization level
    console.log('-------- adding room');

    var room = new Room({
        location: req.body.location,
        name: req.body.name,
        updatedOn: req.body.updatedOn,
        hasConferenceEquipment: req.body.hasConferenceEquipment,
        hasVideoProjector: req.body.hasVideoProjector,
        size: req.body.size
    });

    room.save(function (err, m) {
        if (err) {
            console.log(err);
        } else {
            //console.log('room added: ', m);
            res.status(200).json(m);
        }
    });

});

apiRoutes.get('/rooms/:id', function (req, res, next) {// /rooms/:id (get a room)

    //check authorization level

    console.log('-------- getting room');

    var roomId = req.params.id;

    Room
        .findOne({
            _id: roomId
        })
        .exec(function (err, room) {
            if (err) {
                console.log(err);
            } else {
                res.status(200).json(room);
            }
        });
});

apiRoutes.put('/rooms/:id', function (req, res, next) {// /rooms/:id (edit a room)
    //check authorization level(done in .use() part, above)(only the standard and admin users will be let through)

    console.log('-------- updating room');

    var roomId = req.params.id;

    Room
        .findOne({
            _id: roomId
        })
        .exec(function (err, room) {
            if (err) {
                console.log(err);
            } else if (room) {
                //check if user is among the editors/owner
                //...

                _.extend(room, req.body);

                room.save(function (err, m) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('-------- room updated successfully');
                        res.status(200).json(m);
                    }
                });
            }

            //res.status(304).json(room);
        });
});

apiRoutes.delete('/rooms/:id', function (req, res, next) {// /rooms/:id (delete a room)
    //next(new Error('not implemented'));

    //check authorization level
    //check if user is among the editors/owner

    console.log('------ deleting room');

    var roomId = req.params.id;

    if (roomId) {
        Room
            .findOneAndRemove({
                _id: roomId
            },
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('------ room deleted');
                    res.status(200).json({message: 'Room deleted'});
                }
            });
    }
});

/* USERS routes */
apiRoutes.post('/users', function (req, res, next) {// /users (create a user)
    //check authorization level
    console.log('-------- adding user');

    if (!req.body.email || !req.body.password) {
        return res.status(400).json({success: false, message: 'Please fill out all fields'});
    }

    var user = new User();

    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.admin = (req.body.admin || false);

    user.save(function (err, u) {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json(u);
        }
    });
});

apiRoutes.get('/users/:id', function (req, res, next) {// /users/:id (get a user)

    //check authorization level

    console.log('-------- getting user');

    var userId = req.params.id;

    User
        .findOne({
            _id: userId
        })
        .exec(function (err, user) {
            if (err) {
                console.log(err);
            } else {
                res.status(200).json(user);
            }
        });
});

apiRoutes.put('/users/:id', function (req, res, next) {// /users/:id (edit a user)
    //check authorization level(done in .use() part, above)(only the standard and admin users will be let through)

    console.log('-------- updating user');

    var userId = req.params.id;

    User
        .findOne({
            _id: userId
        })
        .exec(function (err, user) {
            if (err) {
                console.log(err);
            } else if (user) {
                //check if user is among the editors/owner
                //...

                user.email=req.body.email;
                user.admin=req.body.admin;
                //_.extend(user, req.body);

                user.save(function (err, m) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('-------- user updated successfully');
                        res.status(200).json(m);
                    }
                });
            }

            //res.status(304).json(user);
        });
});

apiRoutes.delete('/users/:id', function (req, res, next) {// /users/:id (delete a user)
    //next(new Error('not implemented'));

    //check authorization level
    //check if user is among the editors/owner

    console.log('------ deleting user');

    var userId = req.params.id;

    if (userId) {
        User
            .findOneAndRemove({
                _id: userId
            },
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('------ user deleted');
                    res.status(200).json({message: 'User deleted'});
                }
            });
    }
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
