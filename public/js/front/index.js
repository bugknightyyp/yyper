;define('main',function(require){
  var $ = require('jquery');
  
  var archive = $('#archive');
  
  archive.on('click', 'li', function(e){
   if ($(this).has("> ul")) {
     $(this).find('> ul').toggle();
   }
    
   e.stopPropagation();
  });
 
});
requirejs(['main']);