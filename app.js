const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const apiRouter = require('./routes/api');
const auth = require('./routes/auth');
const helmet = require('helmet');
const compression = require('compression');
const passport = require('passport');
const checkRoleWithPassport= require('./middleware/acl');
const multer  = require('multer');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname)
    }
});
const upload = multer({ storage: storage });
const cors = require('cors');
const app = express();
const corsOpt={
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "exposedHeaders": ['Content-Range', 'X-Content-Range', 'X-Total-Count']

};
const env = process.env.NODE_ENV || 'development';
const config = require('./config/appConfig.json')[env];
//cors
app.use(cors(corsOpt));
app.set('config', config);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, './uploads')));
app.use(passport.initialize());
app.use(passport.session());
app.use('/static', express.static(path.join(__dirname, 'public')));

// Passport configuration
require('./auth');

//routing
app.use('/', indexRouter);
app.use('/auth', auth);
app.use('/users',checkRoleWithPassport(['admin'], passport,'jwt', { session : false }), usersRouter);
app.use('/api',checkRoleWithPassport(['admin'], passport,'jwt', { session : false }), apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(err);
    res.status(500).json({
        message: 'Server error',
    });

    // render the error page
    // res.status(err.status || 500);
    // res.render('error');
});
app.use(helmet());
app.use(compression());



module.exports = app;
