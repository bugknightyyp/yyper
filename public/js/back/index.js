define('projectBase/index', function(require, exprots, module){
  var $ = require('jquery');

	$("#posts-update-db").click(function(){
	   $.post('/back/updatePostsToDb', function(data){
				if (data.num) {
					alert('更新文章'+ data.num +'篇');
				} else {
				  alert(data.err);
				}
		 });

	});

});


