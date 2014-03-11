
var path = require('path');
var _ = require('underscore');
var async = require('async');
var util = require('util');

var Post = require('../../models/front/post');
//Post.freshPostsCache();
//Post.getPosts();
//Post.getPostsProx("posts");



module.exports = function(app) {
  //2014-01-15
  app.get('/test/express_pass_parameters/query*', function(req, res){
    
    var str = util.format('您请求的url是：%s;\n我得到的query数据是：%j', req.url, req.query);
    res.send(str);
  });
  app.get('/test/express_pass_parameters/params/:type', function(req, res){
    var str = util.format('您请求的url是：%s;\n我得到的params数据是：%j', req.url, {type: req.params.type});
    /*这里的req.params是个数组，如果你的路由path是正则表达式的话，req.params是存放子表达式的匹配结果，如果是形如:xxx，这种格式化的形式，那么参数会作为req.params的静态属性保存，如req.params.type = 'params';*/
    res.send(str);
  });
  app.post('/test/express_pass_parameters/post', function(req, res){
    var str = util.format('您请求的url是：%s;\n我得到的post数据是：%j', req.url, req.body);
    res.send(str);
  });
  
  //2014-01-16
  app.get('/test/why-can-we-write-the-express-router-in-that-way/:path?/:url?', function(req, res){
    function makeRegExp(path, keys, sensitive, strict) {
      if (toString.call(path) == '[object RegExp]') return path;
      if (Array.isArray(path)) path = '(' + path.join('|') + ')';
      path = path
        .concat(strict ? '' : '/?')
        .replace(/\/\(/g, '(?:/')
        .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?(\*)?/g, function(_, slash, format, key, capture, optional, star){
          keys.push({ name: key, optional: !! optional });
          slash = slash || '';
          return ''
            + (optional ? '' : slash)
            + '(?:'
            + (optional ? slash : '')
            + (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')'
            + (optional || '')
            + (star ? '(/*)?' : '');
        })
        .replace(/([\/.])/g, '\\$1')
        .replace(/\*/g, '(.*)');
      return new RegExp('^' + path + '$', sensitive ? '' : 'i');
    }
    
    var pattern = makeRegExp(req.params.path, [], false, false);
    
    var str = util.format('路由path是：%s;\n生成的RegExp是：%s;\n请求url是：%s;\n使用exec方法匹配结果是：<%s></%s>', 
        req.params.path, pattern, req.params.url, pattern.exec(req.params.url));
    res.send(str);
  });
  
   
}

  

