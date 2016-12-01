// Generated on 2016-04-09 using generator-angular 0.15.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Automatically load required Grunt tasks
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin',
    ngtemplates: 'grunt-angular-templates',
    "string-replace": 'grunt-string-replace',
    concat_in_order: 'grunt-concat-in-order',
    cdnify: 'grunt-google-cdn',
    comments: 'grunt-stripcomments',
    removeHtmlComments: 'grunt-remove-html-comments',
    filerev_replace: 'grunt-filerev-replace',
    karma: 'grunt-karma'
  });

  // Configurable paths for the application
    var appConfig = {
        moduleNames: require('./bower.json').moduleNames || [],
    dist: 'obj/Release/dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
          files: ['{,*/}*.js'],
          tasks: ['newer:jshint:all', 'newer:jscs:all'],
          options: {
              livereload: '<%= connect.options.livereload %>'
          }
      },
      //html: {
      //    files: ['{,*/}index.html'],
      //    tasks: ['update-dependency']
      //},
      //jsTest: {
      //  files: ['test/spec/{,*/}*.js'],
      //  tasks: ['newer:jshint:test', 'newer:jscs:test', 'karma']
      //},
      styles: {
          files: ['<%= yeoman.appPath %>/**/*.css'],
          tasks: ['newer:copy:styles', 'postcss', 'uglify:css']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      //livereload: {
      //  options: {
      //    livereload: '<%= connect.options.livereload %>'
      //  },
      //  files: [
      //    '{,*/}*.html',
      //    'bin/styles/{,*/}*.css',
      //    'images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
      //  ]
      //}
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('bin'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect().use(
                '/app/styles',
                connect.static('./app/styles')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test:
          {
              app: {
                  options: {
                      port: 9001,
                      middleware: function (connect) {
                          return [
                            connect.static('bin'),
                            connect.static('test'),
                            connect().use(
                              '/bower_components',
                              connect.static('./bower_components')
                            ),
                            connect.static(appConfig.moduleNames[0])
                          ];
                      }
                  }
              },
              auth: {
                  options: {
                      port: 9001,
                      middleware: function (connect) {
                          return [
                            connect.static('bin'),
                            connect.static('test'),
                            connect().use(
                              '/bower_components',
                              connect.static('./bower_components')
                            ),
                            connect.static(appConfig.moduleNames[1])
                          ];
                      }
                  }
              },
          },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'tests/.jshintrc'
        },
        src: ['tests/spec/{,*/}*.js']
      }
    },

    // Make sure code styles are up to par
    jscs: {
      options: {
        config: '.jscsrc',
        verbose: true
      },
      all: {
        src: [
          'Gruntfile.js',
          '{,*/}*.js'
        ]
      },
      test: {
        src: ['tests/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            'bin',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git{,*/}*'
          ]
        }]
      },
      server: 'bin'
    },

    // Add vendor prefixed styles
    postcss: {
      options: {
        processors: [
          require('autoprefixer-core')({browsers: ['last 1 version']})
        ]
      },
      server: {
        options: {
          map: true
        },
        files: [{
          expand: true,
          cwd: 'bin/styles/',
          src: '{,*/}*.css',
          dest: 'bin/styles/'
        }]
      },
      dist: {
          files: [{
              expand: true,
              cwd: 'bin/<%= yeoman.appPath %>/styles/',
              src: '{,*/}*.css',
              dest: 'bin/<%= yeoman.appPath %>/styles/'
          }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['*index.html'],
        ignorePath:  /\.\.\//
      },
      test: {
        devDependencies: true,
        src: '<%= karma.unit.configFile %>',
        ignorePath:  /\.\.\//,
        fileTypes:{
          js: {
            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
              detect: {
                js: /'(.*\.js)'/gi
              },
              replace: {
                js: '\'{{filePath}}\','
              }
            }
          }
      }
    }, 

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/*/{,*/}*.js',
          '<%= yeoman.dist %>/*/styles/{,*/}*.css',
          '<%= yeoman.dist %>/*/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/*/styles/fonts/*'
        ]
      }
    },

    filerev_replace: {
        options:{
            assets_root: 'bin/'
        },
        views: {
            options: {
                views_root: 'bin/<%= yeoman.appPath %>'
            },
            src: '<%= yeoman.dist %>/<%= yeoman.appPath %>/*.html'
        }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: 'index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      js: ['<%= yeoman.dist %>/{,*/}*.js'],
      options: {
        assetsDirs: [
          '<%= yeoman.dist %>',
          '<%= yeoman.dist %>/images',
          '<%= yeoman.dist %>/styles'
        ],
        patterns: {
          js: [[/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']]
        }
      }
    },

     //The following *-min tasks will produce minified files in the dist folder
     //By default, your `index.html`'s <!-- Usemin block --> will take care of
     //minification. These next options are pre-configured if you do not wish
     //to use the Usemin blocks.
     cssmin: {
       dist: {
           files: {
               '<%= yeoman.dist %>/<%= yeoman.appPath %>/styles/style.min.css': [
                 'bin/<%= yeoman.appPath %>/styles/style.css'
               ]
         }
       }
     },
     uglify: {
         dist: {
             files: {
                 '<%= yeoman.dist %>/<%= yeoman.appPath %>/<%= yeoman.appPath %>.min.js': [
                 '<%= yeoman.dist %>/<%= yeoman.appPath %>/<%= yeoman.appPath %>.js'
                 ]
             }
         },
         css: {
             files: {
                 '<%= yeoman.appPath %>/styles/style.css': [
                 '<%= yeoman.appPath %>/**/*.css',
                 'common/styles/*.css'
                 ]
             }
         },
     },
     comments: {
         tmp: {
             // Target-specific file lists and/or options go here. 
             options: {
                 singleline: true,
                 multiline: true
             },
             src: ['bin/*.html'] // files to remove comments from 
         },
     },
     removeHtmlComments: {
         dist: {
             files: [{
                 expand: true,
                 cwd: '<%= yeoman.appPath %>',
                 src: '**/*.html',
                 dest: 'bin/<%= yeoman.appPath %>'
             }, ],
         }
     },

     concat_in_order: {
         dist: {
             options: {
                 extractRequired: function (filepath, filecontent) {
                     var workingdir = filepath.split("/");
                     workingdir.pop();

                     var deps = this.getMatches(/<script.*?src="(?!.(?:.*bower_components.*?"))(.*?\.js)">?/g, filecontent);
                     deps.forEach(function (dep, i) {
                         var requiredPath = workingdir.concat([dep.split('/').join("\\")]).join("\\");
                         grunt.log.writeln([requiredPath]);
                         deps[i] = requiredPath;
                     });
                     return deps;
                 },
                 extractDeclared: function (filepath) {
                     return [filepath];
                 },
                 onlyConcatRequiredFiles: true
             },
             files: {
                 '<%= yeoman.dist %>/<%= yeoman.appPath %>/<%= yeoman.appPath %>.js': [
                     'bin/<%= yeoman.appPath %>/index.html'
                 ],
             }
         }
     },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true
        },
        files: [{
          expand: true,
          cwd: 'bin',
          src: ['**/*.html'],
          dest: 'bin'
        },]
      }
    },

    'string-replace': {
        app: {
            files: [{
                expand: true,
                cwd: 'bin/<%= yeoman.appPath %>',
                src: '**/*-directive.js',
                dest: 'bin/<%= yeoman.appPath %>'
            }],
            options: {
                replacements: [{
                    pattern: /templateUrl: '(.*?)',/g,
                    replacement: function (match, p1) {
                        var html = grunt.file.read('bin/' + appConfig.moduleNames[0] + '/' + p1);

                        return "template: '" + html.split("'").join("\\'") + "',";
                    }
                }]
            }
        },
        removeScrApp: {
            files: [{

                '<%= yeoman.dist %>/<%= yeoman.appPath %>/index.html': ['bin/<%= yeoman.appPath %>/index.html'],
            }],
            options: {
                replacements: [{
                    pattern: /(?!<script.*src="(?:.*bower_components.*)")<script.*src="(.*\.js).*"/g,
                    replacement: '<script type="text/javascript" src="' + appConfig.moduleNames[0] + '.js"',
                }]
            }
        },

        goToMin: {
            files: [{
                '<%= yeoman.dist %>/<%= yeoman.appPath %>/index.html': ['<%= yeoman.dist %>/<%= yeoman.appPath %>/index.html'],
            }],
            options: {
                replacements: [{
                    pattern: /(?!<script.*src="(?:.*bower_components.*)")(.*?)\.js"/g,
                    replacement: function (match, p1) {
                        return match.replace(p1, p1 + ".min");
                    },
                },
                {
                    pattern: /(?!<link.*href="(?:.*bower_components.*)")(.*?)\.css"/g,
                    replacement: function (match, p1) {
                        return match.replace(p1, p1 + ".min");
                    },
                }]
            }
        },
        correctGoogleCDN: {
            files: [{
                '<%= yeoman.dist %>/<%= yeoman.appPath %>/index.html': ['<%= yeoman.dist %>/<%= yeoman.appPath %>/index.html'],
            }],
            options: {
                replacements: [{
                    pattern: /"\.\.\/\.\.\/\/a/g, // a for ajax
                    replacement: "\"https://a",
                },
                {
                    pattern: /"\.\.\/\.\.\/bower_components\/(.*?)\/.*?"/g,
                    replacement: function (match, p1) {
                        var opts = require("cdnjs-cdn-data");

                        if (p1 == "angular-bootstrap") p1 = "angular-ui-bootstrap";
                        var cdn;
                            if (opts[p1]) {
                                cdn = opts[p1].url(opts[p1].versions[opts[p1].versions.length - 1]);
                                grunt.log.writeln([cdn, opts[p1]]);
                            }

                        return cdn ? "https:" + cdn : match;
                    },
                }]
            }
        },

        post: {
            files: [{
                '<%= yeoman.dist %>/<%= yeoman.appPath %>/<%= yeoman.appPath %>.js': ['<%= yeoman.dist %>/<%= yeoman.appPath %>/<%= yeoman.appPath %>.js']
            }],
            options: {
                replacements: [ {
                    pattern: /<\!DOCTYPE[^]*\<\/html>/g,
                    replacement: ""
                } ]
            }
        },
    },

    // Replace Google CDN references
    cdnify: {
        dist: {
            html: ['<%= yeoman.dist %>/**/*.html'],
            bower: '../bower.json'
        }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
          files: [{
              expand: true,
              dot: true,
              cwd: '<%= yeoman.appPath %>',
              dest: '<%= yeoman.dist %>/<%= yeoman.appPath %>',
              src: [
                '*.{ico,png,txt}',
                '/images/{,*/}*.{webp}',
                '*/styles/fonts/{,*/}*.*',
              ]
          }, {
              expand: true,
              dot: true,
              cwd: '<%= yeoman.moduleNames[1] %>',
              dest: '<%= yeoman.dist %>/<%= yeoman.moduleNames[1] %>',
              src: [
                '*.{ico,png,txt}',
                '/images/{,*/}*.{webp}',
                '*/styles/fonts/{,*/}*.*',
              ]
          }, {
              // common 
              expand: true,
              dot: true,
              cwd: 'common',
              dest: '<%= yeoman.dist %>/<%= yeoman.moduleNames[1] %>',
              src: [
                '**/*.{ico,png,txt}',
              ]
          }, {
              // common 
              expand: true,
              dot: true,
              cwd: 'common',
              dest: '<%= yeoman.dist %>/<%= yeoman.appPath %>',
              src: [
                '**/*.{ico,png,txt}',
              ]
          }, {
              // config files
              expand: true,
              dot: true,
              cwd: '<%= yeoman.appPath %>',
              dest: '<%= yeoman.dist %>/<%= yeoman.appPath %>',
              src: [
                '**/*.json',
              ]
          }, {
              // config files
              expand: true,
              dot: true,
              cwd: '<%= yeoman.moduleNames[1] %>',
              dest: '<%= yeoman.dist %>/<%= yeoman.moduleNames[1] %>',
              src: [
                '**/*.json',
              ]
          }, {
          expand: true,
          cwd: 'bin/images',
          dest: '<%= yeoman.dist %>/images',
          src: ['generated/*']
          },
          {
              // copy libs
              expand: true,
              cwd: 'bower_components',
              src: '**/*',
              dest: '<%= yeoman.dist %>/<%= yeoman.appPath %>/bower_components'
          },
          {
              // copy libs
              expand: true,
              cwd: 'bower_components',
              src: '**/*',
              dest: '<%= yeoman.dist %>/<%= yeoman.moduleNames[1] %>/bower_components'
          },
          {
              expand: true,
              cwd: 'images',
              src: '*',
              dest: '<%= yeoman.dist %>/images'
          }, ]
      },
      styles: {
          files: [{
              expand: true,
              cwd: '<%= yeoman.appPath %>/styles',
              dest: 'bin/<%= yeoman.appPath %>/styles',
              src: '{,*/}*.css'
          }, {
              expand: true,
              cwd: '<%= yeoman.moduleNames[1] %>/styles',
              dest: 'bin/<%= yeoman.moduleNames[1] %>/styles',
              src: '{,*/}*.css'
          }, ]
      },

      tmp: {
          files: [{
              expand: true,
              cwd: '.',
              src: '<%= yeoman.moduleNames[1] %>/**/*.js',
              dest: 'bin'
          }, {
              expand: true,
              cwd: '.',
              src: '<%= yeoman.appPath %>/**/*.js',
              dest: 'bin'
          }, ]
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
        options: {
            files: [
                'bower_components/angular/angular.js',
                'bower_components/angular-mocks/angular-mocks.js',
                'bower_components/angular-animate/angular-animate.min.js',
                'bower_components/angular-bootstrap/ui-bootstrap.min.js',
                'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                'bin/<%= yeoman.appPath %>/**/*.js',
                'bin/<%= yeoman.moduleNames[1] %>/**/*.js',
            ]
        },
      unit: {
        configFile: 'tests/karma.conf.js',
        singleRun: true
      }
    }
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'postcss:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'wiredep',
    'concurrent:test',
    'postcss',
    'buildDirectives',
    'connect:test',
    'karma'
  ]);
  grunt.registerTask('buildDirectives', [
    'copy:tmp',
    'removeHtmlComments:dist',
    'postcss:dist',
    'htmlmin:dist',

    'string-replace:auth',
    'string-replace:app',
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'concurrent:dist',

    'buildDirectives',

    'concat_in_order',

    'copy:dist',

    'string-replace:removeScrApp',
    'string-replace:removeScrAuth',
    'cdnify',
    'string-replace:goToMin',

    'cssmin',

    'string-replace:post',
    'uglify:dist',

    'string-replace:correctGoogleCDN',

    'filerev',
    'filerev_replace',
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'newer:jscs',
    'test',
    'build'
  ]);
};
