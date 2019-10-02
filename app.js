require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mongoose = require('mongoose');
var { database } = require('./config/env');
var passport = require('passport');
var debug = require('debug')('plus-delta:app.js');

mongoose
  .connect(database.url, database.options)
  .then(function() {
    debug('DB connected: ');
  })
  .catch(function(err) {
    debug(err);
  });

var app = express();
app.use(cors());

require('./config/passport')(passport);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// MONGOOSE DEFAULTS
mongoose.connection.once('open', function() {
  debug('MongoDB connection opened!');
});
mongoose.connection.on('reconnected', function() {
  debug('MongoDB reconnected!');
});
mongoose.connection.on('connected', function() {
  debug('Mongoose default connection connected');
});
mongoose.connection.on('error', function(err) {
  debug('Mongoose default connection error:' + err);
});
mongoose.connection.on('disconnected', function() {
  debug('Mongoose default connection disconnected');
});

mongoose.connection.on('reconnectFailed', () => {
  process.nextTick(() => {
    throw new Error('Mongoose could not reconnect to MongoDB server');
  });
});

process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    debug('Mongoose default connection disconnected on app termination');
    process.exit(0);
  });
});

module.exports = app;
