/*
     * grunt-init
     * https://gruntjs.com/
     *
     * Copyright (c) 2014 "Cowboy" Ben Alman, contributors
     * Licensed under the MIT license.
     */

    'use strict';

    module.exports = function(grunt) {

      // Project configuration.
      grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
          dist: {
            src: ['node_modules/normalize.css/normalize.css'],
            dest: 'assets/less/base.less'
          }
        },

        jshint: {
          all: [
            'Gruntfile.js',
            'assets/js/*.js',
          ],
          options: {
            globals: {
              jQuery: true,
              console: false,
              module: true
            }
          }
        },

        uglify: {
          dist: {
            files: {
              'assets/js/main.min.js': ['assets/js/main.js']
            }
          }
        },

        less : {
          development: {
            options: {
              paths: ["assets/css"]
            },
            files: {
              "assets/css/main.css": "assets/less/main.less"
            }
          },
          production: {
            options: {
              paths: ["assets/css"],
              modifyVars: { //https://github.com/gruntjs/grunt-contrib-less/blob/master/test/fixtures/modifyVars.less
                imgPath: '"http://mycdn.com/path/to/images"',
                bgColor: 'red'
              }
            },
            files: {
              "assets/css/main.css": "assets/less/main.less"
            }
          }
        },

        postcss: {
          options: {
            map: {
                inline: false, // save all sourcemaps as separate files...
                annotation: 'assets/css/' // ...to the specified directory
            }, 

            processors: [
              require('rucksack-css')(),
              require('pixrem')(), // add fallbacks for rem units
              require('autoprefixer')({browsers: ['last 2 versions', '> 5%']}), // add vendor prefixes
              require('css-mqpacker')(),
              require('cssnano')() // minify the result
            ]
          },
          dist: {
            src: 'assets/css/main.css'
          }
        },

        connect: {
          server: {
            options: {
              //livereload: true,
              //keepalive: true,
              port: 8081,
              hostname: 'localhost'
            }
          }
        },


        watch: {
          js: {
            files: ['assets/js/main.js'],
            tasks: ['uglify:dist'],
            options: {
              livereload: true,
            }
          },
          less: { 
            files: ['assets/less/*.less'],
            tasks: ['concat','less','postcss'],
            options: {
              livereload: true,
            }
          }
        }
      });

      // These plugins provide necessary tasks.
      grunt.loadNpmTasks('grunt-contrib-concat');
      grunt.loadNpmTasks('grunt-contrib-jshint');
      grunt.loadNpmTasks('grunt-contrib-uglify');
      grunt.loadNpmTasks('grunt-contrib-watch');
      grunt.loadNpmTasks('grunt-contrib-connect');
      grunt.loadNpmTasks('grunt-postcss');
      grunt.loadNpmTasks('grunt-contrib-less');

      // By default, lint and run all tests.
      grunt.registerTask('default', ['concat','uglify','recess']);
      grunt.registerTask('serve', ['connect', 'watch']);

    };
