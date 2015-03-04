angular.module(
  'PixelWall',
  [
    'angular-sortable-view',
    'angularFileUpload',
    'gridster',
    'hitmands.auth',
    'leaflet-directive',
    'LocalStorageModule',
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
  'AuthServiceProvider',
  'localStorageServiceProvider',
  function(
    $locationProvider,
    $urlRouterProvider,
    $provide,
    AuthServiceProvider,
    localStorageServiceProvider
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
    localStorageServiceProvider
      .setPrefix('pixelwall')
      .setStorageType('sessionStorage')
      .setNotify(true, true);
    return this;
  }
])
.run([
  '$rootScope',
  'AuthService',
  'localStorageService',
  'uiRouterConsole',
  function(
    $rootScope,
    AuthService,
    localStorageService,
    uiRouterConsole
  ) {
    var auth = localStorageService.get('auth');
    if (auth) {
      AuthService.setCurrentUser(auth.user, 1000, auth.token);
    }
    $rootScope.currentUser = AuthService.getCurrentUser();
    $rootScope.isUserLoggedIn = AuthService.isUserLoggedIn();
    $rootScope.$on('hitmands.auth:update', function(event) {
      $rootScope.currentUser = AuthService.getCurrentUser();
      $rootScope.isUserLoggedIn = AuthService.isUserLoggedIn();
      localStorageService.set('auth', {
        user: AuthService.getCurrentUser(),
        token: AuthService.getAuthenticationToken()
      });
    });
    uiRouterConsole.active = false;
  }
]);

