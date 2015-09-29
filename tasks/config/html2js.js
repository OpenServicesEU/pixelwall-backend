/**
 * Precompiles Underscore templates to a `.jst` file.
 *
 * ---------------------------------------------------------------
 *
 * (i.e. basically it takes HTML files and turns them into tiny little
 *  javascript functions that you pass data to and return HTML. This can
 *  speed up template rendering on the client, and reduce bandwidth usage.)
 *
 * For usage docs see:
 *    https://github.com/gruntjs/grunt-contrib-jst
 *
 */

module.exports = function(grunt) {

  var templateFilesToInject = [
    'templates/**/*.html'
  ];

  grunt.config.set('html2js', {
    options: {
      module: 'sailsTemplates',
      rename: function(name) {
        return name.replace('../assets/templates/', '');
      },
      useStrict: true,
      singleModule: true,
      watch: true
    },
    dev: {
      src: [require('../pipeline').templateFilesToInject],
      dest:'.tmp/public/templates.js'
    }
  });
  grunt.loadNpmTasks('grunt-html2js');
};
