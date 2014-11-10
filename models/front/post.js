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
Post.getOnePostAndArchive = function(fileName, callback){
  async.waterfall([
    function(callback){
      Post.getOnePost(fileName, function(err, htmlStr, obj){

        callback(err, htmlStr, obj);
      });
  }, function(htmlStr, obj, callback){//生成文章导航




    var sreplace = function(str, start, length, word) {
      return  str.replace(
      new RegExp("^([\\s\\S]{" + start + "}).{" + length + "}"), "$1" + word);
    };


    var layers = null;
    var count = 0;
    var elPattern = /<h(\d)[^>]*?>(.+?)<\/h\1>/gi;

    var repStr = '';
    var temp = null;
    var lastNode = null;
    while(temp = elPattern.exec(htmlStr)){
      handle();
    }

    function handle(){
      var info = {};

      temp[1] = parseInt(temp[1], 10);

      info.node = temp[0];
      info.nodeHierarchy = temp[1];
      info.nodeHtml = temp[2].slice(-1) == ':'? temp[2].slice(0, -1) : temp[2];

      if (temp[1] == 1) {
        info.parentNode = null;
        info.hierarchy = '';
        layers = info;
        lastNode = info;
      } else if (lastNode.nodeHierarchy - temp[1]  == -1) {
        if (typeof lastNode.subNode == 'undefined') {
          lastNode.subNode = [];

        }
        info.parentNode = lastNode;
        lastNode.subNode.push(info);
        info.hierarchy = lastNode.hierarchy + '-' + (lastNode.subNode.length);
        info.index = ++count;
        lastNode = info;

        repStr = '<a name="'+ encodeURIComponent( info.nodeHtml + '-' + info.index )+'" hierarchy="'+ info.hierarchy.slice(1) +'"></a>';
        htmlStr = sreplace(htmlStr, temp.index, 0, repStr);
        elPattern.lastIndex += repStr.length;

      } else if (lastNode.nodeHierarchy - temp[1]  == 0) {
        lastNode.parentNode.subNode.push(info);
        info.parentNode = lastNode.parentNode;
        info.hierarchy = info.parentNode.hierarchy + '-' + (info.parentNode.subNode.length);
        info.index = ++count;
        lastNode = info;
        repStr = '<a name="'+ encodeURIComponent( info.nodeHtml + '-' + info.index )+'" hierarchy="'+ info.hierarchy.slice(1) +'"></a>';
        htmlStr = sreplace(htmlStr, temp.index, 0, repStr);
        elPattern.lastIndex += repStr.length;
      } else {
        lastNode = lastNode.parentNode;
        handle();
      }

    }
    
    layers.nodeNum = count;
     callback(null, htmlStr, layers, obj);
  }],
  function(err, htmlStr, layers, obj ){


    var rslt = '';

    function render(data){
      if (data.parentNode) {

        var indexOf = data.parentNode.subNode.indexOf(data);
        var len = data.parentNode.subNode.length;

        if (indexOf == 0){
         rslt += '<ul><li hierarchy='+ data.hierarchy.slice(1) +'><a href="#'+ encodeURIComponent(data.nodeHtml + '-' + data.index ) +'">'+ data.nodeHtml +'</a>'

         if (data.subNode && data.subNode.length){
            data.subNode.forEach(function(el,index, arr){
            render(el);
           });
         }
         rslt += len == 1?'</li></ul>' : '</li>';
        } else if (indexOf < (len - 1)){

          rslt += '<li hierarchy='+ data.hierarchy.slice(1) +'><a href="#'+ encodeURIComponent(data.nodeHtml + '-' + data.index ) +'">'+ data.nodeHtml +'</a>'

          if (data.subNode && data.subNode.length){
            data.subNode.forEach(function(el,index, arr){
            render(el);
           });
          }

          rslt += '</li>';
        } else {
          rslt += '<li hierarchy='+ data.hierarchy.slice(1) +'><a href="#'+ encodeURIComponent(data.nodeHtml + '-' + data.index ) +'">'+ data.nodeHtml +'</a>'

          if (data.subNode && data.subNode.length){
            data.subNode.forEach(function(el,index, arr){
            render(el);
           });
          }

          rslt += '</li></ul>';
        }
      }


    }

     layers.subNode && layers.nodeNum > 1 && layers.subNode.forEach(function(el,index, arr){
            render(el);
     });

    callback(null, htmlStr, rslt, obj);
  });

};


module.exports = Post;
