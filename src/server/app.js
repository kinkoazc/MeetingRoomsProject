/*jshint node:true*/
'use strict';

// =======================
// get the packages we need ============
// =======================
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    favicon = require('serve-favicon'),
    morgan = require('morgan'),
    port = process.env.PORT || 8001,// used to create, sign, and verify tokens
    four0four = require('./utils/404')(),
    mongoose = require('mongoose'),
    config = require('./config'), // get our config file
    User = require('./models/user'), // get our mongoose model
    Room = require('./models/room'),
    Meeting = require('./models/meeting'),
    environment = process.env.NODE_ENV,
    async = require('async'),
    moment = require('moment'),
    _ = require('lodash-node');

// =======================
// configuration =========
// =======================
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

app.use(favicon(__dirname + '/favicon.ico'));

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// =======================
// routes ================
// =======================
// basic route
//app.get('/', function (req, res) {
//    res.send('Hello! The API is at http://localhost:' + port + '/api');
//});

app.get('/setup', function (req, res) {
    //// create a sample user
    //var nick = new User({
    //    name: 'Nick Cerminara',
    //    password: 'password',
    //    admin: true
    //});
    //
    //// save the sample user
    //nick.save(function (err) {
    //    if (err) throw err;
    //
    //    console.log('User saved successfully');
    //    res.json({success: true});
    //});

    var user1, user2, room1, room2;

    // http://www.kdelemme.com/2014/07/28/read-multiple-collections-mongodb-avoid-callback-hell/
    async.waterfall([//in series, throwing the results downstream and the error to the main callback
            /* Users */
            function (callback) {
                user1 = {
                    email: 'admin@gmail.com',
                    password: 'password',
                    isAdmin: true
                };

                User.findOne({
                    email: user1.email
                }, function (err, user) {
                    if (err) {
                        return callback(err);
                    }

                    if (user) {
                        return callback(null, [{success: false, message: 'Admin user already exists!'}]);
                    } else if (!user) {

                        user = new User();

                        user.email = user1.email;
                        user.admin = user1.isAdmin;
                        user.setPassword(user1.password);

                        user.save(function (err) {
                            if (err) {
                                callback(err);
                            }

                            console.log('User saved successfully');
                            return callback(null, [{success: true, token: user.generateJWT()}]);
                        });
                    }
                });
            },

            function (arg, callback) {
                user2 = {
                    email: 'user@gmail.com',
                    password: 'passwords',
                    isAdmin: false
                };

                User.findOne({
                    email: user2.email
                }, function (err, user) {
                    if (err) {
                        return callback(err);
                    }

                    if (user) {
                        arg.push({success: false, message: 'User already exists!'});
                        return callback(null, arg);
                    } else if (!user) {

                        user = new User();

                        user.email = user2.email;
                        user.admin = user2.isAdmin;
                        user.setPassword(user2.password);

                        user.save(function (err) {
                            if (err) {
                                callback(err);
                            }

                            console.log('User saved successfully');
                            arg.push({success: true, token: user.generateJWT()});
                            return callback(null, arg);
                        });
                    }
                });
            },

            /* Populate with rooms */
            function (arg, callback) {
                room1 = {
                    name: 'Room 13',
                    location: '6th Floor, Europe House',
                    size: 30,
                    hasVideoProjector: false,
                    hasConferenceEquipment: true
                };

                Room.findOne({
                    name: room1.name
                }, function (err, room) {
                    if (err) {
                        return callback(err);
                    }

                    if (room) {
                        arg.push({success: false, message: 'Room already exists!'});
                        return callback(null, arg);
                    } else if (!room) {

                        room = new Room();

                        _.extend(room, room1);

                        room.save(function (err) {
                            if (err) {
                                callback(err);
                            }

                            console.log('Room saved successfully');
                            arg.push({success: true, message: 'Room saved'});
                            return callback(null, arg);
                        });
                    }
                });
            },

            function (arg, callback) {
                room2 = {
                    name: 'Room 67',
                    location: '5th Floor, Europe House',
                    size: 50,
                    hasVideoProjector: true,
                    hasConferenceEquipment: false
                };

                Room.findOne({
                    name: room2.name
                }, function (err, room) {
                    if (err) {
                        return callback(err);
                    }

                    if (room) {
                        arg.push({success: false, message: 'Room already exists!'});
                        return callback(null, arg);
                    } else if (!room) {

                        room = new Room();

                        _.extend(room, room2);

                        room.save(function (err) {
                            if (err) {
                                callback(err);
                            }

                            console.log('Room saved successfully');
                            arg.push({success: true, message: 'Room saved'});
                            return callback(null, arg);
                        });
                    }
                });
            },

            /* Populate with meetings */
            function (arg, mainCallback) {
                console.log('populating meetings');

                async.parallel([
                        function (callback) {
                            User.findOne({
                                email: user1.email
                            }, function (err, user) {
                                if (err) {
                                    return callback(err);
                                } else if (user) {
                                    return callback(null, user);
                                }
                            });
                        },
                        function (callback) {
                            User.findOne({
                                email: user2.email
                            }, function (err, user) {
                                if (err) {
                                    return callback(err);
                                } else if (user) {
                                    return callback(null, user);
                                }
                            });
                        },
                        function (callback) {
                            Room.findOne({
                                name: room1.name
                            }, function (err, room) {
                                if (err) {
                                    return callback(err);
                                } else if (room) {
                                    return callback(null, room);
                                }
                            });
                        },
                        function (callback) {
                            Room.findOne({
                                name: room2.name
                            }, function (err, room) {
                                if (err) {
                                    return callback(err);
                                } else if (room) {
                                    return callback(null, room);
                                }
                            });
                        }
                    ],

                    function (err, results) {
                        if (err) {
                            mainCallback(err);
                        }

                        var meetingObj = {
                            description: 'Scrum meeting',
                            who: [results[0]],
                            when: +(new Date('June 13, 2015 11:30:00')),
                            duration: (1000 * 60) * 80, /* 80 mins */
                            allowed: [results[0], results[1]],
                            room: [results[2]]
                        };

                        Meeting.findOne({
                            description: meetingObj.description,
                            when: meetingObj.when,
                            room: meetingObj.room
                        }, function (err, meeting) {
                            if (err) {
                                mainCallback(err);
                            }

                            if (meeting) {
                                arg.push({success: false, message: 'Meeting already exists!'});
                                return mainCallback(null, arg);
                            } else {
                                meeting = new Meeting();

                                _.extend(meeting, meetingObj);

                                meeting.save(function (err) {
                                    if (err) {
                                        mainCallback(err);
                                    }

                                    console.log('Meeting saved successfully');
                                    arg.push({success: true, message: 'Meeting saved'});
                                    return mainCallback(null, arg);
                                });
                            }
                        });

                    });

                //Room.findOne({
                //    name: roomObj.name
                //}, function (err, room) {
                //    if (room) {
                //        arg.push({success: false, message: 'Room already exists!'});
                //        return callback(null, arg);
                //    } else if (!room) {
                //
                //        room = new Room();
                //
                //        _.extend(room, roomObj);
                //
                //        room.save(function (err) {
                //            if (err) callback(err);
                //
                //            console.log('Room saved successfully', arg);
                //            arg.push({success: true});
                //            return callback(null, arg);
                //        });
                //    }
                //});
            }
        ],

        //Compute all results(results is an array of
        function (err, results) {
            if (err) {
                console.log(err);
                return res.send(400);
            }

            if (results == null || results[0] == null) {
                return res.send(400);
            }

            //results contains [Users, Rooms, Meetings]
            return res.status(200).send(results);
        });
});

// apply the routes to our application with the prefix /api
app.use('/api', require('./routes'));

// =======================
// start the server ======
// =======================
console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

switch (environment) {
    case 'build':
        console.log('** BUILD **');
        app.use(express.static('./build/'));
        // Any invalid calls for templateUrls are under app/* and should return 404
        app.use('/app/*', function (req, res, next) {
            four0four.send404(req, res);
        });
        // Any deep link calls should return index.html
        app.use('/*', express.static('./build/index.html'));
        break;
    default:
        console.log('** DEV **');
        app.use(express.static('./src/client/'));
        app.use(express.static('./'));
        app.use(express.static('./tmp'));
        // Any invalid calls for templateUrls are under app/* and should return 404
        app.use('/app/*', function (req, res, next) {
            four0four.send404(req, res);
        });
        // Any deep link calls should return index.html
        app.use('/*', express.static('./src/client/index.html'));
        break;
}

app.listen(port, function () {
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
        '\n__dirname = ' + __dirname +
        '\nprocess.cwd = ' + process.cwd());
});
