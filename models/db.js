
var setting = require('../settings').db;
var _ = require('underscore');
var util = require('util');
var async = require('async');
var MongoClient = require('mongodb').MongoClient;

var paramStr = '';

_.each(setting.options, function(key, val){
   paramStr += (value + "=" + name + "&");
});

paramStr = paramStr.slice(0, -1);

var dbURL = util.format('mongodb://%s:%s/%s?%s', setting.host, setting.port, setting.dbName, paramStr);


exports.dbURL = dbURL;
exports.MongoClient = MongoClient;

exports.getWaterfallCollection = function(collectionName, options, tasks, callback){
  var options = options;
  if (arguments.length == 3) {
    suffixTasks = options;
    callback = tasks;
    options = {};
  }
  var tempdb = null;
  var prefixTasks = [function(callback){
      MongoClient.connect(dbURL, function(err, db){
        tempdb = db;
        callback(err, db);
      });
    }, function(db, callback){
          db.collection(collectionName, options, function(err, collection){
          callback(err, collection);
        });
    }];
  async.waterfall( prefixTasks.concat(suffixTasks), function(){
  
      tempdb.close();
      callback.apply(null, arguments);
  });
};
