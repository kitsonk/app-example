module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-contrib-stylus');

	var staticSrcFiles = [ 'src/**/*.{html,png,ts}' ];

	require('grunt-dojo2').initConfig(grunt, {
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
