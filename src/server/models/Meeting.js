// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//find meetings, pagination, etc.
//http://mongoosejs.com/docs/queries.html

var MeetingSchema = new Schema({
    description: {type: String, required: true},
    who: [{type: Schema.Types.ObjectId, ref: 'User', required: true}],
    when: {type: Number, required: true},
    duration: {type: Number, required: true},
    allowed: [{type: Schema.Types.ObjectId, ref: 'User', required: true}],
    updatedOn: {type: Date, default: Date.now},
    room: [{type: Schema.Types.ObjectId, ref: 'Room', required: true}]
});

MeetingSchema.pre('save', function (next) {
    var now = new Date();
    this.updatedOn = now;
    //if ( !this.createdAt ) {
    //    this.createdAt = now;
    //}
    next();
});

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Meeting', MeetingSchema);
