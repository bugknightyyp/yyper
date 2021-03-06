
var path = require('path');
var express = require('express');
var app = express();

var hbs = require('hbs');
var routes = require('./routes');
//var MongoStore = require('connect-mongo')(express);
var settings = require('./settings');
var dbURL = require('./models/db').dbURL;
//var MongoClient = require('./models/db').MongoClient;


//express middlware
var bodyParser = require('body-parser');
var expressSession= require('express-session');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var morgan  = require('morgan');
var methodOverride = require('method-override');

/*var sessionStore = new MongoStore({
  url: dbURL
});*/


//端口设置
app.set('port', process.env.PORT || settings.app.port);
//配置模板路径及模板引擎
app.set('views', __dirname + '/views');

//设置默认扩展名
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

//设置路由
app.enable('strict routing');

//app.use(flash());
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(morgan('dev'));
//app.use(express.logger({stream: accessLog}));
app.use(bodyParser({ keepExtensions: true, uploadDir: './public/images' }));

app.use(methodOverride());
app.use(cookieParser());
/*app.use(expressSession({
  secret: 'yyper',
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
  store: sessionStore
}));*/




//配置combo服务
app.get(/(\/js)|(\/css)/i, 
	require('flex-combo')(settings.flexCombo.options, __dirname));

//静态文件路径配置
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'posts')));

//绑定路由
routes(app);

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
