// Import required modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Import route modules
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var lab1_05Router = require('./routes/lab1');
var lab1_05_1Router = require('./routes/lab1_1');

// Create an instance of the Express application
var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));  
app.use(express.json());  
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser());  // Parsing cookies
app.use(express.static(path.join(__dirname, 'public')));  

// Route setup
app.use('/', indexRouter);  // Main application route
app.use('/users', usersRouter);  // Users route
app.use('/lab1', lab1_05Router);
app.use('/lab1_1', lab1_05_1Router);  // Lab1 route

// 404 Error handler: Forward to the error handler below
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error details in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page with the appropriate status code
  res.status(err.status || 500);
  res.render('error');
});

// Export the Express application
module.exports = app;
