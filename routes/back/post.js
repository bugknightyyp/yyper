
var path = require('path');
var rd = require('node-rd');
var _ = require('underscore');
var async = require('async');

var Post = require('../../models/back/post');
//Post.freshPostsCache();
//Post.getPosts();
//Post.getPostsProx("posts");



module.exports = function(app) {
  /*app.get('/', function(req, res){
    res.render('front_view/index', {
      pageName: "index",
      title: '主页',
    });
  });*/
  app.get('/manage/post', function (req, res) {
    Post.freshPostsToDB(function(err, num){
        res.render('back/post', {
          freshNum: num,
          title: '任务管理',
      });
    });
  });

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
};
