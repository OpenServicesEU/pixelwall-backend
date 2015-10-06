module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'bowercopy',
		'clean:dev',
    'html2js:dev',
		'less:dev',
		'copy:dev',
		'coffee:dev'
	]);
};
