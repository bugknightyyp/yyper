
var path = require('path');
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
  app.post('/back/updatePostsToDb', function (req, res) {
    Post.updatePostsToDb(function(err, num){
       if (err) {
			    res.json({ err: err.name });
			 } else {
					res.json({ num: num });
			 }
    });
  });





















};
