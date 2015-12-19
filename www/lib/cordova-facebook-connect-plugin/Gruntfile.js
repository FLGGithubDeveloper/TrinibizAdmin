module.exports = function (grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    // Project configuration
    grunt.initConfig({
        // Metadata
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= props.license %> */\n',
        // Task configuration
        jshint: {
            options: {
                node: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                eqnull: true,
                browser: true,
                globals: { jQuery: true },
                boss: true
            },
            gruntfile: {
                src: 'gruntfile.js'
            },
            lib_test: {
                src: ['lib/**/*.js', 'test/**/*.js']
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib_test: {
                files: '<%= jshint.lib_test.src %>',
                tasks: ['jshint:lib_test']
            }
        },

        karma: {
            options: {
                basePath: '',
                frameworks: ['mocha', 'chai'],
                files: [
                    'lib/**/*.js',
                    'test/spec/**/*.js'
                ],
                autoWatch: false,
                reporters: ['dots', 'coverage'],
                port: 8080,
                singleRun: false,
                coverageReporter: {
                    reporters: [{
                        type: 'text-summary'
                    }]
                }
            },
            unit: {
                browsers: ['PhantomJS'],
                background: true
            },
            continuous: {
                browsers: ['PhantomJS'],
                singleRun: true
            }
        }
    });

    // Default task
    grunt.registerTask('default', ['jshint']);

    grunt.registerTask('watch:karma', function () {
        var karma = {
            files: [
                'lib/**/*.js',
                'test/spec/**/*.js'
            ],
            tasks: ['jshint', 'karma:unit:run']
        };

        grunt.config.set('watch', karma);

        return grunt.task.run(['watch']);
    });

    grunt.registerTask('test', [
        'karma:continuous'
    ]);

    grunt.registerTask('test:debug', [
        'karma:unit:start',
        'watch:karma'
    ]);
};

