
var path = require('path');
var _ = require('underscore');
var async = require('async');

var Post = require('../../models/back/post');
//Post.freshPostsCache();
//Post.getPosts();
//Post.getPostsProx("posts");



module.exports = function(app) {
  app.get('/back', function(req, res){
    res.render('back/index', {
          title: '任务管理',
    });
  });



};
