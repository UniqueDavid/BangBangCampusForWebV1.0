//整个项目的路由管理文件
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session=require('express-session');
var bodyParser = require('body-parser');
var redis=require('redis'),
    RDS_PORT=6379,
    RDS_HOST='112.74.41.59',
    RDS_PWD='2017bangbangcampus',
    RDS_OPTS={auth_pass:RDS_PWD},
    client=redis.createClient(RDS_PORT,RDS_HOST,RDS_OPTS);
var RedisStore=require('connect-redis')(session);

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
//设置session保存相关信息
app.use(session({
    secret:"bangbangcampusweb2017",
    store:new RedisStore({
       client:client
    }),
    cookies:{maxAge:60*1000*30},
}));
//启动redis服务器
client.on('ready',function (res) {
    console.log('redis服务器启动！');
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//这里使用engine指令让html替换ejs模板，便于使用html开发View
app.engine('.html',require('ejs').__express);
app.set('view engine','html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);


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
