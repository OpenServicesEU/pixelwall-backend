module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'bower:install',
		'clean:dev',
    'html2js:dev',
		'less:dev',
		'copy:dev',
		'coffee:dev'
	]);
};
