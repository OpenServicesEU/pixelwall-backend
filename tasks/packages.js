/**
 * tasks/packages.js
 */

module.exports.less = {
  dest: './assets/vendor/less',
  files: {
    'bootstrap': 'bootstrap/less',
    'bootswatch/cerulean': 'bootswatch/cerulean/*.less',
    'bootswatch/cosmo': 'bootswatch/cosmo/*.less',
    'bootswatch/cyborg': 'bootswatch/cyborg/*.less',
    'bootswatch/darkly': 'bootswatch/darkly/*.less',
    'bootswatch/flatly': 'bootswatch/flatly/*.less',
    'bootswatch/journal': 'bootswatch/journal/*.less',
    'bootswatch/lumen': 'bootswatch/lumen/*.less',
    'bootswatch/paper': 'bootswatch/paper/*.less',
    'bootswatch/readable': 'bootswatch/readable/*.less',
    'bootswatch/sandstone': 'bootswatch/sandstone/*.less',
    'bootswatch/simplex': 'bootswatch/simplex/*.less',
    'bootswatch/slate': 'bootswatch/slate/*.less',
    'bootswatch/spacelab': 'bootswatch/spacelab/*.less',
    'bootswatch/superhero': 'bootswatch/superhero/*.less',
    'bootswatch/united': 'bootswatch/united/*.less',
    'bootswatch/yeti': 'bootswatch/yeti/*.less',
    'weather-icons': 'weather-icons/less',
    'angular-ui-clock': 'angular-ui-clock/angular-clock.less',
    'angular-gridster': 'angular-gridster/src/angular-gridster.less',
    'angular-cfp-hotkeys/hotkeys.less': 'angular-cfp-hotkeys/src/hotkeys.css',
    'angular-confirmable/angular-confirmable.less': 'angular-confirmable/src/angular-confirmable.css',
    'angular-ui-select/select.less': 'angular-ui-select/dist/select.css',
    'angular-widget-grid/grid.less': 'angular-widget-grid/angular-widget-grid.css',
    'angular-xeditable/xeditable.less': 'angular-xeditable/dist/css/xeditable.css',
    'angularjs-color-picker/color-picker.less': 'angularjs-color-picker/angularjs-color-picker.css',
    'ng-sortable/ng-sortable.less': 'ng-sortable/dist/ng-sortable.css',
    'ngBoxFill/ng-boxfill.less': 'ngBoxFill/ng-boxfill.css',
    'quill/base.less': 'quill/dist/quill.base.css',
    'quill/snow.less': 'quill/dist/quill.snow.css',
    'open-sans': 'open-sans-fontface/open-sans.less',
    'font-awesome': 'font-awesome/less'
  }
};

module.exports.fonts = {
  dest: './assets/vendor/fonts',
  files: {
    'open-sans': 'open-sans-fontface/fonts',
    'glyphicons': 'bootstrap/fonts',
    'font-awesome': 'font-awesome/fonts',
    'weather-icons': 'weather-icons/font'
  }
};

module.exports.javascript = {
  dest: './assets/vendor/javascript',
  files: {
    'jquery': [
      'jquery/dist/jquery.js',
      'javascript-detect-element-resize/*.js'
    ],
    'angular': [
      'angular/angular.js',
      'angular-animate/angular-animate.js',
      'angular-bootstrap/ui-bootstrap-tpls.js',
      'angular-cfp-hotkeys/src/hotkeys.js',
      'angular-confirmable/src/angular-confirmable.js',
      'angular-gridster/src/angular-gridster.js',
      'angular-leaflet-directive/dist/angular-leaflet-directive.js',
      'angular-locker/src/angular-locker.js',
      'angular-resource-sails/src/sailsResource.js',
      'angular-resource/angular-resource.js',
      'angular-sanitize/angular-sanitize.js',
      'angular-simple-logger/dist/angular-simple-logger.js',
      'angular-translate-loader-static-files/angular-translate-loader-static-files.js',
      'angular-translate/angular-translate.js',
      'angular-ui-clock/angular-clock.js',
      'angular-ui-router/release/angular-ui-router.js',
      'angular-ui-select/dist/select.js',
      'angular-widget-grid/angular-widget-grid.js',
      'angular-xeditable/dist/js/xeditable.js',
      'angularjs-color-picker/angularjs-color-picker.js',
      'ng-file-upload/ng-file-upload.js',
      'ng-lodash/build/ng-lodash.js',
      'ng-quill/src/ng-quill.js',
      'ng-sortable/dist/ng-sortable.js',
      'ngBoxFill/ng-boxfill.js',
      'ngOpenWeatherMap/ng-openweathermap.js'
    ],
    'bootstrap': 'bootstrap/dist/js/bootstrap.js',
    'leaflet': [
      'leaflet/dist/leaflet.js',
      'leaflet-providers/leaflet-providers.js'
    ],
    'mathjs': 'mathjs/dist/math.js',
    'io': [
      'socket.io-client/socket.io.js',
      'sails.io.js/sails.io.js',
    ],
    'quill': 'quill/dist/quill.js',
    'mousetrap': 'mousetrap/mousetrap.js'
  }
};

module.exports.images = {
  dest: './assets/vendor/images',
  files: {
    'leaflet': 'leaflet/dist/images',

  }
};
