var sanitizeHtml = require('sanitize-html');
var MessagingResponse = require('twilio').twiml.MessagingResponse;
var Message = require('../models/Message');

// create a new message when Twilio sends us a text
exports.create = function(request, response) {
    // Create a new Message from the Twilio request
    var msg = new Message({
        from: request.body.From,
        body: sanitizeHtml(request.body.Body)
    });

    // save it, and return a response
    msg.save(function(err) {
        if (err) return reply('Oops, there was a problem.');

        // Otherwise, confirm their message has been received
        reply('Message has been received!');
    });

    // return a TwiML response
    function reply(message) {
        var twiml = new MessagingResponse();
        twiml.message(message);
        response.type('text/xml');
        response.send(twiml.toString());
    }
};

// List Message records in our database
exports.list = function(request, response) {
    // Use a custom query to get all the messages in a specific order
    Message.listAll(function(err, docs) {
        // Render a Jade template with all the message data
        response.render('messages', {
            messages: docs
        });
    });
};
