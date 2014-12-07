var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

// CONFIGURATION
// Connect to database
mongoose.connect(configDB.url);

// pass passport for configuration
require('./config/passport')(passport); 

// express application set up
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

// set up ejs for templating
app.set('view engine', 'ejs'); 

// required for passport
app.use(session({ secret: 'timelineappisthebestapp' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// ROUTES
require('./app/routes.js')(app, passport);

// LAUNCH
app.listen(port);
console.log('timeline happening on port ' + port);