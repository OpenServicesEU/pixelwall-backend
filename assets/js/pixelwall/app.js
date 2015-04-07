angular.module(
  'PixelWall',
  [
    'angular-locker',
    'angular-sortable-view',
    'angularFileUpload',
    'cfp.hotkeys',
    'gridster',
    'leaflet-directive',
    'mgo-angular-wizard',
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
/*
    if (locker.driver('session').has('auth')) {
      var auth = locker.driver('session').get('auth');
      AuthService.setCurrentUser(auth.user, 1000, auth.token);
    }
    $rootScope.currentUser = AuthService.getCurrentUser();
    $rootScope.isUserLoggedIn = AuthService.isUserLoggedIn();
    $rootScope.$on('hitmands.auth:update', function(event) {
      $rootScope.currentUser = AuthService.getCurrentUser();
      $rootScope.isUserLoggedIn = AuthService.isUserLoggedIn();
      locker.driver('session').put('auth', {
        user: AuthService.getCurrentUser(),
        token: AuthService.getAuthenticationToken()
      });
    });
*/
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

