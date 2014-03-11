
var path = require('path');
var _ = require('underscore');
var async = require('async');

var Post = require('../../models/front/post');
//Post.freshPostsCache();
//Post.getPosts();
//Post.getPostsProx("posts");



module.exports = function(app) {
  app.get('/', function(req, res){
    res.render('front/index', {
     layout: 'front/layout',
      title: '主页',
    });
  });
  
  
  app.get('/posts', function (req, res) {
    var tasks = []
      .concat(function(callback){
          Post.getPosts(function(err, docs){
            callback(err, docs);
          });
      })
    async.waterfall(tasks, function(err, docs){
      res.render('front/posts', {
				layout: 'front/layout',
        title: 'post列表页',
        posts: docs
      });
    });   
  });
  
  
  app.get('/post/:year(\\d+)/:month(\\d+)/:day(\\d+)/:name', function (req, res){
    
      var fileName = path.join(req.params.year, req.params.month, req.params.day, req.params.name);
      Post.getOnePost(fileName, function(err, htmlStr, obj){
      res.render('front/post', {
        layout: 'front/layout',
        pageName: "post_list",
        articleName: req.params.name,
        title: obj.postTitle,
        content: htmlStr
      });
      }); 
    
  });
  
  //测试用例重定向
  app.get('/post/:year(\\d+)/:month(\\d+)/:day(\\d+)/:name([^\/]+)/test_cases*', function (req, res){
    res.redirect(req.url.replace(/\/(post)/, function(post){
      return '';
    }));
   
  });

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
};
