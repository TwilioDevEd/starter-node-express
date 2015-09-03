var cheerio = require('cheerio');
var supertest = require('supertest');
var mongoose = require('mongoose');
var expect = require('chai').expect;
var app = require('../webapp');
var config = require('../config');
var Message = require('../models/Message');

describe('Messages web application', function() {

    // Create supertest agent to test our routes
    var agent = supertest(app);

    // Create a MongoDB connection and clear out messages collection before 
    // running tests
    before(function(done) {
        mongoose.connect('mongodb://127.0.0.1/test');
        Message.remove({}, done);
    });

    // Test creating a message
    describe('POST /messages', function() {
        it('should require both a from number and a body', function(done) {
            agent.post('/messages').expect(200).end(function(err, response) {
                var $ = cheerio.load(response.text);
                expect($('Message').text())
                    .to.equal('Oops, there was a problem.');
                done();
            });
        });

        it('should create a message', function(done) {
            agent.post('/messages')
                .type('form')
                .send({
                    From: '+15556667777',
                    Body: 'hello world'
                })
                .expect(200)
                .end(function(err, response) {
                    var $ = cheerio.load(response.text);
                    expect($('Message').text())
                        .to.equal('Message has been received!');
                    done();
                });
        });
    });

    describe('GET /messages', function() {
        it('should require HTTP basic authentication', function(done) {
            agent.get('/messages').expect(401, done);
        });

        it('should display a table containing one message', function(done) {
            agent.get('/messages')
                .auth(config.basic.username, config.basic.password)
                .expect(200)
                .end(function(err, response) {
                    var $ = cheerio.load(response.text);
                    expect($('tr').length).to.equal(2);
                    done();
                });
        });
    });
});