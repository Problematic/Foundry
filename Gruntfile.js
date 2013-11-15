module.exports = function (grunt) {
    "use strict";

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        concat: {
            dist: {
                src: ['build/intro.js', 'src/Foundry.js', 'build/outro.js'],
                dest: 'dist/Foundry.js'
            }
        }
    });
};
