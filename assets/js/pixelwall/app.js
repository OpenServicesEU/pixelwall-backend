angular.module(
  'PixelWall',
  [
    'angular-locker',
    'as.sortable',
    'cfp.hotkeys',
    'color.picker',
    'ds.clock',
    'gridster',
    'leaflet-directive',
    'ngAnimate',
    'ngBoxFill',
    'ngFileUpload',
    'ngLodash',
    'ngOpenWeatherMap',
    'ngQuill',
    'ngSanitize',
    'pascalprecht.translate',
    'sailsResource',
    'sailsTemplates',
    'ui.bootstrap',
    'ui.router',
    'ui.select',
    'widgetGrid',
    'xeditable'
  ]
)
.config([
  '$locationProvider',
  '$urlRouterProvider',
  '$translateProvider',
  'lockerProvider',
  'sailsResourceProvider',
  'owmProvider',
  function(
    $locationProvider,
    $urlRouterProvider,
    $translateProvider,
    lockerProvider,
    sailsResourceProvider,
    owmProvider
  ) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
    lockerProvider.defaults({
      driver: 'session',
      namepspace: 'Pixelwall',
      separator: '.',
      eventsEnabled: false
    });
    sailsResourceProvider.configuration = {
      prefix: '/api',
      verbose: true
    };
    $translateProvider.useStaticFilesLoader({
      prefix: '/languages/',
      suffix: '.json'
    }).determinePreferredLanguage().useSanitizeValueStrategy('sanitize');
    owmProvider.setApiKey('55ac628d8520b054b89a696658e82fcd');
    return this;
  }
])
.run([
  '$state',
  '$rootScope',
  'lodash',
  'locker',
  'uiRouterConsole',
  'loginModal',
  'backendModal',
  'editableOptions',
  'hotkeys',
  function(
    $state,
    $rootScope,
    lodash,
    locker,
    uiRouterConsole,
    loginModal,
    backendModal,
    editableOptions,
    hotkeys
  ) {
    angular.element(window).on("resize", $rootScope.$apply);
    editableOptions.theme = 'bs3';
    L.Icon.Default.imagePath = "/vendor/images/leaflet";
    if (locker.driver('session').has('user')) {
      $rootScope.currentUser= locker.driver('session').get('user');
    }
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
      var requireLogin = lodash.get(toState, 'data.requireLogin' , false);

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
    io.socket.on('connect', function(){
      if ($rootScope.modal) {
        $rootScope.modal.close();
        $rootScope.modal = undefined;
      }
      $rootScope.$broadcast('backend-connected');
      console.log('Established connection to server')
    });
    io.socket.on('disconnect', function(){
      $rootScope.$broadcast('backend-disconnected');
      $rootScope.modal = backendModal();
      console.log('Lost connection to server');
    });
    hotkeys.bindTo($rootScope)
    .add({
      combo: 'b',
      description: 'Got back to the main menu',
      callback: function() {
        $state.go('index');
      }
    })
    .add({
      combo: 'c',
      description: 'Simulate backend connection loss',
      callback: function () {
        if ($rootScope.modal) {
          $rootScope.modal.close();
          $rootScope.modal = undefined;
        } else {
          $rootScope.modal = backendModal();
        }
      }
    });
  }
]);

