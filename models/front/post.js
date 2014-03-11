var path = require('path');
var util = require('util');
var fs = require('fs');
var _ = require('underscore');
var async = require('async');
var marked = require('marked');
var jf = require('jsonfile')
var postConfig = require('../../settings').post;


var highlight = require('highlight.js')

marked.setOptions({
  highlight: function (code) {
    return highlight.highlightAuto(code).value;
  }
});


var db = require('../db');

var Post = function(){};
var prot = Post.prototype;



Post.getPosts = function(callback){
  var tasks = []
    .concat(function(collection, callback){
      collection.find().toArray(function(err, docs){
           callback(err, docs);
      });
    });
   
  db.getWaterfallCollection("posts", tasks, function(err, docs){
      //console.log(docs);
      callback(err, docs);
  });
};

Post.getOnePost = function(fileName, callback){// [/]2014/05/06/marked[/]
  var fileName = fileName || "2014\\01\\09\\test-marked"; 
      fileName = fileName
        .replace(/([\\\/\+.])/gi, "\\$1");//转义特殊字符
  var pattern  = new RegExp(fileName, "i");
  var tasks = []
      .concat(function(collection, callback){
          collection.findOne({"postFile": pattern},{},function(err, obj){
            callback(err, obj);
          });
      })
      .concat(function(obj, callback){
        fs.readFile(path.join(process.cwd(), obj.postFile), {encoding: 'utf8'}, function(err, data){
           callback(err, data, obj)
        }); 
      })
      .concat(function(mdStr, obj, callback){
          marked(mdStr, function(err, htmlStr){
            callback(err, htmlStr, obj);
          })
      });
  db.getWaterfallCollection("posts", tasks, function(err, htmlStr, obj){
     callback(err, htmlStr, obj);
  });
};


module.exports = Post;