angular.module(
  'PixelWall',
  [
    'angular-sortable-view',
    'angularFileUpload',
    'gridster',
    'mgo-angular-wizard',
    'ngAnimate',
    'ngQuill',
    'picardy.fontawesome',
    'sailsResource',
    'ui.bootstrap',
    'ui.bootstrap-slider',
    'ui.router',
    'xeditable',
    'satellizer'
  ]
)
.config([
  '$locationProvider',
  '$urlRouterProvider',
  '$authProvider',
  '$provide',
  function(
    $locationProvider,
    $urlRouterProvider,
    $authProvider,
    $provide
  ) {
    $provide.decorator('$templateCache', function($delegate, $sniffer) {
      var originalGet = $delegate.get;

      $delegate.get = function(key) {
        var value;
        value = originalGet(key);
        if (!value) {
          value = JST[key]();
          if (value) {
            $delegate.put(key, value);
          }
        }
        return value;
      };

      return $delegate;
    });
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
    $authProvider.loginUrl = '/auth/local';
    return this;
  }
])
.run(['uiRouterConsole', function(uiRouterConsole) {
  uiRouterConsole.active = false;
}]);

