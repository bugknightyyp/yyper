
var path = require('path');
var _ = require('underscore');
var async = require('async');

var Tag = require('../../models/front/tag');
//Post.freshPostsCache();
//Post.getPosts();
//Post.getPostsProx("posts");



module.exports = function(app) {



  app.get('/tags', function (req, res) {
   Tag.getTags(function(err, tags){
      res.render('front/tags', {
        title: 'tags列表页',
        tags: tags
      });
   });
  });

  app.get('/tag/:tag', function (req, res) {
   var tag = req.params.tag;
   Tag.getPostsByTag(tag, function(err, posts){
      res.render('front/postsByTag', {
        title: tag + '相关文章',
        posts: posts
      });
   });
  });




















};
