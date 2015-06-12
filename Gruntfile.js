'use strict';
   
module.exports=function(grunt){
	grunt.initConfig({
	  concat: {
	    js:{
	    	src:['public/application/*.js','public/application/**/*.js'],
	    	dest:'build/js/script.js'
	    },
	    css:{
	    	src:['public/application/assets/css/*.css'],
	    	dest:'build/css/style.css'
	    },
	  }
	});
	
	grunt.loadNpmTasks('grunt-contrib-concat');
	
	grunt.registerTask('default', ['concat']);
	
};
