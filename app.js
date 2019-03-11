const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const logger = require('./util/logger');
const cons = require('consolidate')
const indexRouter = require('./routes/index');
const bodyParser = require('body-parser');
const app = express();

// view engine setup

// app.engine("dust", dustjs.dust({cache:false}))
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'dust');
// app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// 获取远程ip
app.use(function(req, res, next) {
  req.remote_ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
  next();
})

app.use('/', indexRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(async function(err, req, res, next) {
  logger.error(`remote_ip-${req.remote_ip};url:${req.url};query:${JSON.stringify(req.query)};params:${JSON.stringify(req.params)};body:${JSON.stringify(req.body)};error:${err.stack}`);
  res.render('error');
});

module.exports = app;
