angular.module(
  'PixelWall',
  [
    'angular-locker',
    'angular-sortable-view',
    'angularFileUpload',
    'cfp.hotkeys',
    'gridster',
    'hitmands.auth',
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
  'AuthServiceProvider',
  function(
    $locationProvider,
    $urlRouterProvider,
    $provide,
    lockerProvider,
    AuthServiceProvider
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
    AuthServiceProvider.useRoutes({
      login: '/auth/login',
      logout: '/auth/logout',
      fetch: '/user/jwt'
    });
    AuthServiceProvider.parseHttpAuthData(function(data, headers, statusCode) {
      // Logic
      var authLevel = 1000; // ['public', 'author', 'editor'];

      return {
        user: data,
        authLevel: authLevel,
        token: data.id
      };
    });
    lockerProvider.setDefaultNamespace('Pixelwall')
      .setSeparator('.')
      .setEventsEnabled(false);
    return this;
  }
])
.run([
  '$rootScope',
  'locker',
  'AuthService',
  'uiRouterConsole',
  function(
    $rootScope,
    locker,
    AuthService,
    uiRouterConsole
  ) {
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
    uiRouterConsole.active = false;
  }
]);

