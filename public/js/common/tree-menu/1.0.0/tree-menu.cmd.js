define('tree-menu/1.0.0/tree-menu.cmd',['jquery/1.11.0/jquery.cmd.min'],function(require, exports, module){
  var $ = require('jquery/1.11.0/jquery.cmd.min');
;(function ($, window, document, undefined) {

  var pluginName = 'treeMenu',
    defaults = {
        toggle: true,
        arrawControlClose: 'fa fa-angle-left',
        arrawControlOpen: 'fa fa-angle-down',
        arrawControlOn: 'fa  fa-caret-left'
    };
      
  function TreeMenuFactory(element, options) {
    var selectedNode = null;
    
    this.element = element;
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.getSelectedNode = function(){
      return selectedNode;
    };
    this.setSelectedNode = function(node){
        selectedNode = node;
    };
    this.init();
  }

  TreeMenuFactory.prototype = {
      init: function () {

        var _this = this,
            root = $(this.element),
            locationHref = location.href.match(/[^?]+/)[0];
            isMathMenuHref = false;
        
        //init state
        root.find('li').each(function(index, item){
          var self = $(item);
          var aNode = self.find('> a');
          var className =  _this.settings.arrawControlClose;
          
          if (self.has('> ul').length) {
              self.find('> ul').hide();
              aNode.append('<i class="'+ className +'"></i>');
          } else if (aNode.attr("href").match(/[^?]+/)[0] == locationHref) {
                className = _this.settings.arrawControlOn;
                _this.setSelectedNode(aNode);
                aNode.append('<i class="'+ className +'"></i>');
                isMathMenuHref = true;
            } 
          
            
              
          
        });
                
        
        function switchState (elA, elUl) {
          if (elUl.is(":visible")) {
            elA.find("> i").attr('class', _this.settings.arrawControlClose);
          } else {
            elA.find("> i").attr('class', _this.settings.arrawControlOpen);
          }
          
          elUl.animate({
              height: "toggle"
            }, 'fast', function() {
          });
          
          
        }
       
        
        root.on('click', 'li > a', function(e){
          var self = $(this);
          var elUl = self.next();
          
          if (_this.settings.toggle) {
            var openLi = self.parent().siblings().has('ul:visible');
            if (openLi.length) {
              openLi.each(function(index, item){
                switchState($(item).children('a'), $(item).children('ul'));
              });
            }
            
          }
          
          if (elUl.length) {
            e.preventDefault();
            switchState(self, elUl);
          } else {
            var temp = _this.getSelectedNode();
            if (temp) {
              temp.children('i').remove();
            }
            self.append('<i class="'+ _this.settings.arrawControlOn +'"></i>');
            _this.setSelectedNode(self);
          }
          
        });
        
        if (isMathMenuHref) {
          _this.locationToEnd(_this.getSelectedNode());
        } 
      },
      locationToEnd: function(aNode){ //path : 1/2
       /* var _this = this,
            root = $(this.element),
            cssPath = '';
        $.each(path.split('/'), function(index, item){
          cssPath += ('>ul > li:nth-of-type('+ item +') ');
        });
        root.find('li:nth-of-type(1)')*/
        aNode.parentsUntil($(this.element), "ul").show();
      }
  };
  $.fn[ pluginName ] = function (options) {
      return this.each(function () {
          if (!$.data(this, 'plugin_' + pluginName)) {
              $.data(this, 'plugin_' + pluginName, new TreeMenuFactory(this, options));
          }
      });
  };

})(jQuery, window, document);

});