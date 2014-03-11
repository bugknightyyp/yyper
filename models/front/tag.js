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
   
  db.getWaterfallCollection("posts", tasks, function(err, docs){
      //console.log(docs);
      callback(err, docs);
  });
};



module.exports = Tag;