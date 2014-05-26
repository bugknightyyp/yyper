
var path = require('path');
var _ = require('underscore');
var async = require('async');

var Post = require('../../models/front/post');
var Tag = require('../../models/front/tag');
//Post.freshPostsCache();
//Post.getPosts();
//Post.getPostsProx("posts");

module.exports = function(app) {
  app.get('/', function(req, res){
    async.parallel({
      tags: function(callback){
         Tag.getTags(function(err, tags){
            callback(err, tags);
          });
      },
      posts: function(callback){
         Post.getPosts(function(err, posts){
            callback(err, posts);
          });

      }
    }, function(err, results){
      res.render('front/index', {
        title: '主页',
        tags: results.tags,
        posts: results.posts
      });
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


  app.get('/post/:year(\\d+)/:month(\\d+)/:day(\\d+)/:name/', function (req, res){
      var fileName = path.join(req.params.year, req.params.month, req.params.day, req.params.name);

      Post.getOnePostAndArchive(fileName, function(err, htmlStr, archive, obj){
      res.render('front/post', {
        layout: 'front/layout',
        pageName: "post_list",
        articleName: req.params.name,
        title: obj.postTitle,
        archive: archive,
        content: htmlStr
      });
      });

  });
  //如果访问的文章后边没有'/'，则加上，目的是为了方便测试demo的访问
  app.get('/post/:year(\\d+)/:month(\\d+)/:day(\\d+)/:name', function (req, res){
    res.redirect(req.url + '/');
  });


  //测试用例重定向
  app.get('/post/:year(\\d+)/:month(\\d+)/:day(\\d+)/:name([^\/]+)/test*', function (req, res){
    res.redirect(req.url.replace(/\/(post)/, function(post){
      return '';
    }));

  });





















};
