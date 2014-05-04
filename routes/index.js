
module.exports = function(app){
  require('./front/post')(app);
  require('./front/tag')(app);
	
	
	require('./back/index')(app);
  require('./back/post')(app);
  
  
  //测试
  require('./test/2014-01')(app);
};
