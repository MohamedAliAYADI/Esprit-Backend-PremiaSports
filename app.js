var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var ReservationsRouter = require('./routes/Reservations');
var promotionRouter = require('./routes/promotion');

var app = express();
//-------------------------------------------------------
//-------------------------------------------------------
//WS
var reservation = require('./ws/ReservationWS');
var promotion = require('./ws/promotionWS');


//-------------------------------------------------------
//-------------------------------------------------------

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//-------------------------------------------------------
//-------------------------------------------------------
//ROUTER
app.use('/', indexRouter);
app.use('/reservation', reservation);
app.use('/promotion', promotion);



//-------------------------------------------------------
//-------------------------------------------------------
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
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
var mysql = require("mysql");
//Database connection
app.use(function(req, res, next) {
    res.locals.connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'premia_sports'
    });
    res.locals.connect();
    next();
});
module.exports = app;