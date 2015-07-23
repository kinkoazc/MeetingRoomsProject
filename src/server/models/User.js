// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var crypto = require('crypto');
var _ = require('lodash');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    hash: String,
    salt: String,
    admin: {type: Boolean, default: false},
    updatedOn: {type: Date, default: Date.now}
});

UserSchema.pre('save', function(next){
    var now = new Date();
    this.updatedOn = now;
    //if ( !this.createdAt ) {
    //    this.createdAt = now;
    //}
    next();
});

//set up methods on the User schema
UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

    return this.hash === hash;
};

UserSchema.methods.generateJWT = function () {

    // set expiration to 60 days
    //var today = new Date();
    //var exp = new Date(today);
    //exp.setDate(today.getDate() + 60);

    _.extend(this._doc, {exp: (Math.round(Date.now() / 1000) + 1440 * 60)});

    return jwt.sign(this, config.secret, {
        expiresInMinutes: 1440 // expires in 24 hours
    });

    //jwt.sign({
    //    _id: this._id,
    //    username: this.name,
    //    exp: parseInt(exp.getTime() / 1000)
    //}, config.secret);
};

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', UserSchema);
