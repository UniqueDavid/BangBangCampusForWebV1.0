//整个项目的路由管理文件
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var redis=require('redis'),
    RDS_PORT=6379,
    RDS_HOST='112.74.41.59',
    RDS_PWD='bangbangcampus',
    RDS_OPTS={auth_pass:RDS_PWD},
    client=redis.createClient(RDS_PORT,RDS_HOST,RDS_OPTS);
var session=require('express-session');
var RedisStore=require('connect-redis')(session);

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

//启动redis服务器
client.on('ready',function (res) {
    console.log('redis服务器启动！');
});
//设置session保存相关信息
app.use(session({
    resave:false,
    secret:"bangbangcampusweb",
    store:new RedisStore({
        host:'112.74.41.59',
        port:6379,
        ttl:1800
    }),
    cookies:{maxAge:60*1000*30}
}));

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
