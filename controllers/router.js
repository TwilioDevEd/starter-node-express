var messages = require('./messages');
var basic = require('../middleware/basic-auth');

// Map routes to controller functions
module.exports = function(app) {
    // Routes which handle creating messages (via Twilio) and listing them on
    // a simple web page (protected with HTTP basic auth)
    app.post('/messages', messages.create);
    app.get('/messages', basic, messages.list);
};