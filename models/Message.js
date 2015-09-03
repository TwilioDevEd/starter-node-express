var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
    // phone number of sender
    from: {
        type: String,
        required: true
    },

    // the text of their message
    body: {
        type: String,
        required: true
    },

    // date the message was created
    date: {
        type: Date,
        default: Date.now
    }
});

// Find all the messages sent so far, ordered by date
MessageSchema.statics.listAll = function(callback) {
    Message.find().sort('-date').exec(callback);
};

// Create a Mongoose model from our schema
var Message = mongoose.model('Message', MessageSchema);

// export model as our module interface
module.exports = Message;