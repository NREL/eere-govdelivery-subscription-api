module.exports = function(grunt) {


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    useminPrepare: {
      html: 'index.html',
      options: {
        dest: 'dist'
      }
    },

    usemin: {
      html: 'dist/index.html'
      //, options: {
      //   assetsDirs: ['dist', 'dist/css', 'dist/js', 'css', 'js']
      // }
    },

    copy: {
      dist: {
        cwd: 'src',
        src: [ '**' ],
        dest: 'dist',
        expand: true
      },
    },

    uglify: {
      options: {
        banner: '/*!\n'+
                ' * Project: <%= pkg.name %>\n'+
                ' * Version: <%= pkg.version %>\n'+
                ' * Author: <%= pkg.author %>\n'+
                ' * Build Date: <%= grunt.template.today("dd-mm-yyyy") %>\n'+
                ' */\n',
        sourceMap: true,
        sourceMapName: 'dist/client/js/app.js.map',
        compress: {
            drop_console: true
        }
      },
      dist: {
        files: {
          'dist/client/js/app.min.js': ['dist/client/js/app.js']
        }
      }
    },

    jshint: {
      files: ['dist/client/js/app.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          document: true
        },
        laxcomma: true,
        asi: true
      }
    },

    cssmin: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n\n'
      , keepSpecialComments: '*'
      },
      dist: {
        files: {
          'dist/client/css/styles.min.css': ['dist/client/css/styles.css']
        }
      }
    },
    clean: {
      dist: ['dist']
      //dist: ['dist', '!dist/.gitkeep']
    },

    'gh-pages': {
      options: {
        base: 'dist',
        message: 'Auto-generated commit'
      },
      src: ['**']
    },

    watch: {

        //js: {
            files: ['src/*'],
            tasks: ['build'],
            options: {
                livereload: true,
            }
        //}
    }
  });

  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-contrib-watch');



  grunt.registerTask('ghpages', [
      'clean:dist'
    , 'build'
    , 'gh-pages'
  ]);

  grunt.registerTask('deploy', [
      'clean:dist'
    , 'build'
    , 'gh-pages'
  ]);

  grunt.registerTask('build', [
      'copy'
    , 'useminPrepare'
    , 'jshint'
    , 'uglify'
    , 'cssmin'
    , 'usemin'
  ]);

  grunt.registerTask('default', [
      'build'
  ]);


};