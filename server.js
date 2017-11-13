'use strict';

// load dependencies
const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,    
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    routes = require('./app/routes/routes'),
    connectMongo = require('connect-mongo')(session);

require('dotenv').config({ path : 'variables.env' });
mongoose.Promise = global.Promise;
    
mongoose.connect('mongodb://jobbatical:jobbatical@ds257485.mlab.com:57485/jobbatical', {
  useMongoClient : true
});

mongoose.connection.on('error', function(error){
  console.log(error);
});

app.set('view engine', 'pug');

app.use(morgan('dev')); // log all requests to console

// use body-parser
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded( { extended: false } ));

// tell express where to look for static assets
app.use(express.static( __dirname + '/public' ));

app.use(cookieParser());
app.use(session({ 
  secret: 'testing',
  store : new connectMongo({
    mongooseConnection : mongoose.connection
  })
})); // session secret

app.use(function(req, res, next){
  res.locals.user = req.session.user;
  next();
});

// direct routes to router file
app.use(routes);

app.use(function(req, res, next){
  var err = new Error('Page not Found');
  err.status = 404;
  return next(err);
})

app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.render('error',{ error : err });
})
// start server
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});