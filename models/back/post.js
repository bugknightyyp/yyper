var path = require('path');
var util = require('util');
var fs = require('fs');
var rd = require('rd');
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
//var dbURL = require('../models/db').dbURL;
//var MongoClient = require('../models/db').MongoClient;
var postDir = postConfig.postDir;//存放博客的位置；

var Post = function(){};
var prot = Post.prototype;

Post.updatePostsToDb = function(callback){
  // var files = rd.readSync(postDir);
  var files = [];
  rd.eachSync(postDir, function (f, s) {
      var patternMd = /\.md$/i;
      //var patternConfigFile = new RegExp(postConfig.configFileName);
      var configFile = '';
      var setInfo = {};
      
      if (patternMd.test(f)) {//只要 .md 文件
        //console.log('file: %s', f);
        //console.log(path.relative(process.cwd(), f));
        configFile = path.join(path.join(f, '..'), postConfig.configFileName);
        setInfo = jf.readFileSync(configFile);
        setInfo.postName = f.match(/([^\\\/]+)[\\\/][^\\\/]+$/i)[1]; 
        setInfo.postDate = f.match(/\d{4}[\\\/]\d{2}[\\\/]\d{2}/ig)[0].replace(/\\/gi,"/");
        setInfo.configFile = path.relative(process.cwd(), configFile);
        setInfo.postFile = path.relative(process.cwd(), f);
        files.push(setInfo);
      }
    });
  
  //找出所有的 .md 文件
  _.map(files, function(val, index, list){
    list[index] = function(collection, num, callback){
        collection.save(val,function (err, obj) { //obj是插入的对象
              num ++;
              if(_.isObject(obj)){
                var configFile = obj.configFile;
                delete obj.configFile;
                delete obj.postFile;
                jf.writeFile(path.join(path.join(process.cwd(), configFile)), obj);
              } 
              callback(err, collection, num);    
        });
    };
  });
  
  //依次将文章存放目录存如 posts表中
  var tasks = []
      /*.concat(function(collection, callback){
          collection.remove(function(err, numberOfRemovedDocs){//先把之前的全部删除
               callback(err, collection);
           });
      })*/
      .concat(function(collection, callback){
          callback(null, collection, 0);
      })
      .concat(files)
      .concat(function(collection, num, callback){
        callback(null, num);
      });
  db.getWaterfallCollection("posts", tasks, function(err, num){
      callback(err, num);
    });
  
};




module.exports = Post;