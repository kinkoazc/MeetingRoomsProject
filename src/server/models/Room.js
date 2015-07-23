// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoomSchema = new Schema({
    name: {type: String, required: true},
    location: {type: String, required: true},
    size: {type: Number, required: true, default: 0},
    hasVideoProjector: {type: Boolean, default: false},
    hasConferenceEquipment: {type: Boolean, default: false},
    updatedOn: {type: Date, default: Date.now}
});

RoomSchema.pre('save', function (next) {
    var now = new Date();
    this.updatedOn = now;
    //if ( !this.createdAt ) {
    //    this.createdAt = now;
    //}
    next();
});

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Room', RoomSchema);
