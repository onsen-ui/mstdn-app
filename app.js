const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const favicon = require('serve-favicon');


const app = express();
const router = require('./config/router.js');

require('dotenv').config();
app.set('port', process.env.PORT);
app.set('base url', process.env.BASE_URL);

app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  cookie: {}
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

app.use( (req, res, next) => {
  const err = new Error('404 Not Found!');
  err.status = 404;
  next(err);
});

app.use('/api', clientErrorHandler);
app.use(errorHandler);

function clientErrorHandler(err, req, res, next) {
  res.status(500).json({
    messgage: err.message,
    error: err
  });
}

function errorHandler(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
}

module.exports = app;
