var apiRoutes = require('express').Router();
var four0four = require('./utils/404')();
var User = require('./models/user');
//var data = require('./data');

//router.get('/people', getPeople);
//router.get('/person/:id', getPerson);

// API ROUTES -------------------
// route to register a user (POST http://localhost:8001/api/register)
apiRoutes.post('/register', function(req, res, next){
    if(!req.body.name || !req.body.password){
        return res.status(400).json({success: false, message: 'Please fill out all fields'});
    }

    var user = new User();

    user.name = req.body.name;
    user.setPassword(req.body.password);
    user.admin = (req.body.admin || false);

    user.save(function (err) {
        if(err) {
            return next(err);
        }

        return res.status(200).json({success: true, token: user.generateJWT()});
    });
});

// route to authenticate a user (POST http://localhost:8001/api/authenticate)
apiRoutes.post('/authenticate', function(req, res) {

    // find the user
    User.findOne({
        name: req.body.name
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (!user.validPassword(req.body.password)) {
                res.status(401).json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                // if user is found and password is right
                // create a token
                var token = user.generateJWT();

                // return the information including token as JSON
                res.status(200).json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }
        }

    });
});

// route middleware to verify a token
apiRoutes.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
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
apiRoutes.get('/', function(req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!' });
});

// route to return all users (GET http://localhost:8001/api/users)
apiRoutes.get('/users', function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});

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
