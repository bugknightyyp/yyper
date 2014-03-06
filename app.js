
var path = require('path');
var express = require('express');
var app = express();
var hbs = require('hbs');
var lessMiddleware = require('less-middleware');
var routes = require('./routes');
var MongoStore = require('connect-mongo')(express);
var settings = require('./settings');
var dbURL = require('./models/db').dbURL;
var MongoClient = require('./models/db').MongoClient;

var sessionStore = new MongoStore({
  url: dbURL
});



//端口设置
app.set('port', process.env.PORT || settings.app.port);
//配置模板路径及模板引擎
app.set('views', __dirname + '/views');

//设置默认扩展名
app.set('view engine', 'hbs');
app.engine('hbs', require('hbs').__express);
hbs.registerPartials(__dirname + '/views/partials');
//注册helper
require('./views/helpers/common.js')(hbs);

//app.use(flash());
app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.logger('dev'));
//app.use(express.logger({stream: accessLog}));
app.use(express.bodyParser({ keepExtensions: true, uploadDir: './public/images' }));
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
  secret: 'yyper-blog',
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
  store: sessionStore
}));

app.use(app.router);



//配置combo服务
app.use( require('flex-combo')(__dirname, settings.flexCombo.urls, settings.flexCombo.options));

//静态文件路径配置
app.use(express.static(path.join(__dirname, 'public')));

//绑定路由
routes(app);

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
