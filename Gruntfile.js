module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: {
            app: 'angular-placeholder',
            src: 'src',
            dist: 'dist'
        },
        watch: {
            livereload: {
                files: [
                    '<%= config.src %>}/{,*/}*.less',
                    '<%= config.src %>}/{,*/}*.js'
                ],
                tasks: ['livereload']
            }
        },
        regarde: {
            js: {
                files: ['<%= config.src %>/**/*.js'],
                tasks: ['jshint'],
                spawn: true
            }
        },
        clean: [
            '<%= config.dist %>/*'
        ],
        jshint: {
            all: [
                'Gruntfile.js',
                '<%= config.app %>/src/{,*/}*.js'
            ]
        },
        uglify: {
            options: {
                banner:
                    '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    ' <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                    ' <%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
                    ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>; \n' +
                    ' */'
            },
            dist: {
                files: {
                    '<%= config.dist %>/angular-placeholder.min.js': ['<%= config.src %>/*.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-regarde');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Simply watch script which does a build on entry
    grunt.registerTask('watch', [
        'default',
        'regarde'
    ]);

    // Build dist version of latest code
    grunt.registerTask('default', [
        'clean',
        'jshint',
        'uglify'
    ]);

};
