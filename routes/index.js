
module.exports = function(app){
  require('./front/post')(app);
  require('./back/post')(app);
  
  //测试
  require('./test_case/2014-01')(app);
};
