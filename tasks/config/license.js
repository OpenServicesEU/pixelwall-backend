/**
 * Generates a list of licenses used in a project
 *
 * For usage docs see:
 *    https://github.com/AceMetrix/grunt-license
 */

module.exports = function(grunt) {
  grunt.config.set('license', {});
  grunt.loadNpmTasks('grunt-license');
};
