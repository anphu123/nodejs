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
var bai2Router = require('./routes/bai2');
var bai2_1Router = require('./routes/bai2_1'); // Corrected the router import
var categoriesRouter = require('./routes/categories');
var productsRouter = require('./routes/products');

// Create an instance of the Express application
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route setup
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/lab1', lab1_05Router);
app.use('/lab1_1', lab1_05_1Router);
app.use('/bai2', bai2Router);
app.use('/bai2_1', bai2_1Router); // Corrected the route setup
app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);

// 404 Error handler: Forward to the error handler below
app.use(function(req, res, next) {
  next(createError(404, 'Not Found'));
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
