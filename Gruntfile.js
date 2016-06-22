module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-exec');

	var staticSrcFiles = [ 'src/**/*.{html,png,ts}' ];

	require('grunt-dojo2').initConfig(grunt, {
		exec: {
			build_dojo1: 'ln -sF dojo-util node_modules/util && node_modules/dojo-util/buildScripts/build.sh --profile app-example.profile.js'
		},

		copy: {
			staticSrcFiles: {
				expand: true,
				cwd: '.',
				src: staticSrcFiles,
				dest: '<%= devDirectory %>'
			}
		},

		stylus: {
			dev: {
				options: {},
				files: [ {
					expand: true,
					src: 'src/**/*.styl',
					ext: '.css',
					dest: '_build/'
				} ]
			},
			dist: {
				options: {},
				files: [ {
					expand: true,
					cwd: 'src/',
					src: '**/*.styl',
					ext: '.css',
					dest: 'dist/'
				}]
			}
		}
	});

	grunt.registerTask('dev', [
		'typings',
		'tslint',
		'ts:dev',
		'stylus:dev',
		'copy:staticTestFiles',
		'copy:staticSrcFiles',
		'replace:addIstanbulIgnore',
		'updateTsconfig'
	]);
};
