/**
 * Install bower components.
 *
 * ---------------------------------------------------------------
 *
 * Installs bower components and copies the required files into the assets folder structure.
 *
 */

var path = require('path');

module.exports = function(grunt) {

  var packages = require('../packages') || {};

  var config = {
    options: {
      destPrefix: './assets/vendor'
    }
  };

  for (var prop in packages) {
    if (packages.hasOwnProperty(prop) ) {
      config[prop] = {
        options: {
          destPrefix: packages[prop].dest || path.join(config.options.destPrefix, prop)
        },
        files: packages[prop].files || {}
      };
    }
  }

  grunt.config.set('bowercopy', config);
  grunt.loadNpmTasks('grunt-bowercopy');
};
