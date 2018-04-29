var express = require('express');
var session = require('express-session')
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var signup = require('./routes/signup');
var signupPOST = require('./routes/signupPost');
var loginPOST = require('./routes/loginPOST');
var mainsection = require('./routes/mainsection');
var logout = require('./routes/logout');
var maths = require('./routes/maths');
var science = require('./routes/science');
var db = require('./db');
var app = express();


// setting session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/login',login);
app.use('/signup',signup);
app.post('/signup',signupPOST.signup);
app.post('/login', loginPOST.login);
app.get('/mainsection',mainsection.dashboard);
app.get('/logout', logout.logout);
app.get('/maths',maths.maths);
app.get('/science', science.science);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
