
var _ = require('underscore');

module.exports = function(hbs){
  var blocks = {};

  hbs.registerHelper('extend', function(name, context) {
      var block = blocks[name];
      if (!block) {
          block = blocks[name] = [];
      }

      block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
  });

  hbs.registerHelper('block', function(name) {
      var val = (blocks[name] || []).join('\n');

      // clear the block
      blocks[name] = [];
      return val;
  });
  
  hbs.registerHelper('findValueByKey', function(key, context, options){// 对象，或者对象数组
    var value;
    if (_.isArray(context)) {
      _.each(context, function(item, index, list){
        if (key == item.id) {
          value = item.value
          return false;
        }
      });
    }
    if (_.isObject(context) && context[key]) {
      value = context[key]
    }
    return value;
  });
  hbs.registerHelper('stringify', function(context, options){
    debugger;
    return JSON.stringify(context);
  });
}

