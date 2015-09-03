# Twilio Starter Project for Node.js and Express

This project is intended to jump-start Twilio development projects using Node.js 
and the [Express](http://www.expressjs.com) web framework.  In addition to 
Express, this project contains other third-party modules that may be useful in 
creating Node.js web applications generally.

This sample application demonstrates how to receive incoming SMS messages and
store them in a MongoDB database.

## Deploy On Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/TwilioDevEd/starter-node-express)

## Running the Project on Your Machine

To run this project on your computer, download or clone the source. You will 
also need to download and install either [Node.js](http://nodejs.org/) 
or [io.js](https://iojs.org/en/index.html), both of which should also install 
[npm](https://www.npmjs.com/). 

You will also need to [sign up for a Twilio account](https://www.twilio.com/try-twilio) 
if you don't have one already.

### Install Dependencies

Navigate to the project directory in your terminal and run:

```bash
npm install
```

This should install all of our project dependencies from npm into a local 
`node_modules` folder.

### Configuration

Next, open `config.js` at the root of the project and update it with values 
from your environment and your [Twilio account](https://www.twilio.com/user/account/voice-messaging). 
You can either export these values as system environment variables (this is the 
default setup), or you can replace these values with hard-coded strings 
(be careful you don't commit them to git!).

This sample application stores data in a MongoDB database using 
[Mongoose](http://mongoosejs.com/). You can download and run MongoDB 
yourself ([OS X](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/), 
[Linux](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/), 
[Windows](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/)), 
or you can use a hosted service like [compose.io](https://www.compose.io/).

On OS X, the maybe the easiest way to get MongoDB running locally is to install
via [Homebrew](http://brew.sh/).

```bash
brew install mongodb
```

You should then be able to run a local server with:

```bash
mongod
```

By default, there will be a local database running that's not password protected.
To connect to MongoDB, you'll need a [connection string](http://mongoosejs.com/docs/connections.html) 
to use with Mongoose. Enter this into your current terminal window, and/or consider
adding it to your `.bash_profile` so every new terminal window will have this
setting.

```bash
export MONGO_URL=mongodb://localhost/starter_node_express
```

### Running the Project

To launch the application, you can use `node .` in the project's root directory. 
You might also consider using [nodemon](https://github.com/remy/nodemon) for 
this. It works just like the node command, but automatically restarts your 
application when you change any source code files.

```bash
npm install -g nodemon
nodemon .
```

### Running Tests

Basic functional tests (requires local MongoDB) can be run with:

```bash
npm test
```

### Exposing Webhooks to Twilio

To test your application locally with a Twilio number, we recommend using 
[ngrok](https://ngrok.com/docs). Use ngrok to expose a local port and get a 
publicly accessible URL you can use to accept incoming calls or texts to your 
Twilio numbers.

The following example would expose your local Node application running on port 
3000 at `http://chunky-danger-monkey.ngrok.io` (note that *reserved* subdomains 
are a paid feature of ngrok):

```bash
ngrok http -subdomain=chunky-danger-monkey 3000
```

In your Twilio number configuration, you would then need to add `/voice` as the
Voice URL route, and `/message` as the Messaging URL.

## License

MIT