module.exports = function (grunt) {
    "use strict";

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        concat: {
            dist: {
                src: ['build/intro.js', 'src/Foundry.js', 'build/outro.js'],
                dest: 'dist/Foundry.js'
            }
        },
        jshint: {
            src: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            dist: ['dist/Foundry.js']
        },
        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            ci: {
                singleRun: true,
                browsers: ['PhantomJS']
            }
        }
    });

    grunt.registerTask('default', ['jshint:src', 'karma:ci', 'concat:dist', 'jshint:dist']);
};
