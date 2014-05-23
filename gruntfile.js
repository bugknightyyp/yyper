module.exports = function(grunt){
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    less: {
      options:{
				atBegin: true,
        paths: ["less/common/lesshat/3.0.0"]
      },
      css:{
        files: {
          "public/css/front/index.css": "less/front/index.less"
        }
      }
      
    },
    watch: {
        files: ['less/**/*.less'],
        tasks: ['less']
    }
  });
  
    //grunt.loadNpmTasks('grunt-contrib-uglify');
   // grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');

}