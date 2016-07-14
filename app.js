require('dotenv').config();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var defaultPage = require('./controllers/default');
var weather = require('./controllers/weather');
var account = require('./controllers/account');
var todayWeather = require('./controllers/todayWeather');
var hourlyWeather = require('./controllers/hourlyWeather');
var fiveDayWeather = require('./controllers/fiveDayWeather');
var yearlyWeather = require('./controllers/yearlyWeather');
var searchHistory = require('./controllers/searchHistory');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// app.set('trust proxy', 1);
app.use(session({
  store: new RedisStore({url: process.env.REDIS_URL}),
  secret: 'spacecats',
  resave: false,
  saveUninitialized: false
}));

app.use('/', defaultPage);
app.use('/weather', weather);
app.use('/accounts', account);
app.use('/todayWeather', todayWeather);
app.use('/hourlyWeather', hourlyWeather);
app.use('/fiveDayWeather', fiveDayWeather);
app.use('/yearlyWeather', yearlyWeather);
app.use('/searchHistory', searchHistory);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
