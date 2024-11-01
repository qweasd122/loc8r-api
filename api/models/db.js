const mongoose = require('mongoose');
const readLine = require('readline');
mongoose.set("strictQuery", false);

// const dbURI = 'mongodb://localhost/Loc8r';
const dbPassword = process.env.MONGODB_PASSWORD;
const dbURI = `mongodb+srv://tmdrnjsdl71:${dbPassword}@tacocloud.gnne8vr.mongodb.net/Loc8r`;
mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
    console.log('2020810012 김승권 Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err) {
    console.log('2020810012 김승권 Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
    console.log('2020810012 김승권 Mongoose disconnected');
});

var gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    })
}

// For nodemon restarts
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});

//For Heroku app termination
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app shutdown', function() {
        process.exit(0);
    });
});

require('./locations');