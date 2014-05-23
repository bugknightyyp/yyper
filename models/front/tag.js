var path = require('path');
var util = require('util');
var fs = require('fs');
var _ = require('underscore');
var async = require('async');




var db = require('../db');

var Tag = function(){};
var Tag = Tag.prototype;



Tag.getTags = function(callback){
  var tags = {};
  var tasks = []
    .concat(function(collection, callback){
      var cursor = collection.find({},{'tags': 1,'_id': 0});

      cursor.each(function(err, item){
        if (err) callback(err);

        if (item == null) {
          callback(null, tags);
        } else {
          _.each(item.tags, function(key, index, list){
            if (typeof tags[key] != 'undefined') {
              ++tags[key];
            } else {
              tags[key] = 1;
            }
          });
        }

      });
    });

  db.getWaterfallCollection("posts", tasks, function(err, tags){
      //console.log(docs);
    callback(err, tags);

  });
};

Tag.getPostsByTag = function(tag, callback){
  var posts = [];
  var tasks = []
    .concat(function(collection, callback){
      var cursor = collection.find({tags:{"$in":[tag]}},{'postName': 1,'postDate': 1, 'postTitle': 1});

      cursor.each(function(err, item){
        if (err) callback(err);

        if (item == null) {
          callback(null, posts);
        } else {
        //var temp = {};
         //temp.href = path.join('/post', item.postDate, item.postName).replace(/\\/ig, '/');
         //temp.postName = item.postName;
         posts.push(item);
        }

      });
    });

  db.getWaterfallCollection("posts", tasks, function(err, posts){
      //console.log(docs);
      callback(err, posts);
  });
};


module.exports = Tag;
