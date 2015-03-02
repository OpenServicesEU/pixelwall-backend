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
    'ui.router',
    'xeditable',
    'hitmands.auth'
  ]
)
.config([
  '$locationProvider',
  '$urlRouterProvider',
  '$provide',
  'AuthServiceProvider',
  function(
    $locationProvider,
    $urlRouterProvider,
    $provide,
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
    return this;
  }
])
.run([
  '$rootScope',
  'AuthService',
  'uiRouterConsole',
  function(
    $rootScope,
    AuthService,
    uiRouterConsole
  ) {
    $rootScope.currentUser = AuthService.getCurrentUser();
    $rootScope.isUserLoggedIn = AuthService.isUserLoggedIn();
    $rootScope.$on('hitmands.auth:update', function(event) {
      $rootScope.currentUser = AuthService.getCurrentUser();
      $rootScope.isUserLoggedIn = AuthService.isUserLoggedIn();
    });
    uiRouterConsole.active = false;
  }
]);

