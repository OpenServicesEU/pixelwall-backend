angular.module(
  'PixelWall',
  [
    'angular-locker',
    'angular-sortable-view',
    'angularFileUpload',
    'cfp.hotkeys',
    'gridster',
    'leaflet-directive',
    'ngAnimate',
    'ngQuill',
    'picardy.fontawesome',
    'sailsResource',
    'ui.bootstrap',
    'ui.router',
    'xeditable'
  ]
)
.config([
  '$locationProvider',
  '$urlRouterProvider',
  '$provide',
  'lockerProvider',
  function(
    $locationProvider,
    $urlRouterProvider,
    $provide,
    lockerProvider
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
    lockerProvider.setDefaultNamespace('Pixelwall')
      .setSeparator('.')
      .setEventsEnabled(false);
    return this;
  }
])
.run([
  '$state',
  '$rootScope',
  'locker',
  'uiRouterConsole',
  'loginModal',
  function(
    $state,
    $rootScope,
    locker,
    uiRouterConsole,
    loginModal
  ) {
    if (locker.driver('session').has('user')) {
      $rootScope.currentUser= locker.driver('session').get('user');
    }
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
      var requireLogin = toState.data.requireLogin;

      if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
        event.preventDefault();

        loginModal()
        .then(function () {
          return $state.go(toState.name, toParams);
        })
        .catch(function () {
          return $state.go('index');
        });
      }
    });
    uiRouterConsole.active = false;
  }
]);

