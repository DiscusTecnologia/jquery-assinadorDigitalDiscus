'use strict';
module.exports = function (grunt) {
  // load all grunt tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  
  grunt.initConfig({
    watch: {
      // if any .less file changes in directory "build/less/" run the "less"-task.
      files: ["src/**"],
      tasks: ["copy", "uglify", "concat"]
    },
    //Uglify task info. Compress the js files.
    uglify: {
      options: {
        mangle: false//,
        //preserveComments: 'some'
      },
      my_target: {
        files: [
          {'dist/jquery-assinadorDigitalDiscus.min.js': ['dist/jquery-assinadorDigitalDiscus.js']}
        ]
      }
    },
    concat: {
      'dist/jquery-assinadorDigitalDiscus.min.js': ['src/license.js', 'dist/jquery-assinadorDigitalDiscus.min.js'],
      'example/js/jquery-assinadorDigitalDiscus.min.js': ['src/license.js', 'dist/jquery-assinadorDigitalDiscus.min.js']
    },
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'src/', src: ['jquery-assinadorDigitalDiscus.js'], dest: 'dist/'}
        ]
      }
    }
  });
  // the default task (running "grunt" in console) is "watch"
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('atualiza', ["copy", "uglify", "concat"]);
};