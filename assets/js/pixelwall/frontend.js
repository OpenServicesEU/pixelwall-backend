angular.module('PixelWallFrontEnd', ['ngAnimate', 'ngMaterial', 'ui.router', 'gridster', 'sailsResource'])
.factory('bridgeFactory', function() {
  return {
    listen: function(bridge, signal, callback) {
      if (window.hasOwnProperty(bridge)) {
        window[bridge]['on_' + signal].connect(callback);
      }
    },
    send: function(bridge, slot, data) {
      if (window.hasOwnProperty(bridge)) {
        window[bridge][slot](JSON.stringify(data));
      }
    }
  };
})
.factory('deviceFactory', [
  'sailsResource',
  function(sailsResource) {
    return sailsResource('device', {}, {verbose: true});
  }
])
.factory('pageFactory', [
  'sailsResource',
  function(sailsResource) {
    return sailsResource('page', {}, {verbose: true});
  }
])
.factory('boxFactory', [
  'sailsResource',
  function(sailsResource) {
    return sailsResource('box', {}, {verbose: true});
  }
])
.controller('DeviceController', [
  '$scope',
  'devices',
  function (
    $scope,
    devices
  ) {
    $scope.devices = devices;
  }
])
.controller('DeviceDisplayController', [
  '$scope',
  '$q',
  '$state',
  '$mdToast',
  'bridgeFactory',
  'device',
  function(
    $scope,
    $q,
    $state,
    $mdToast,
    bridgeFactory,
    device
  ) {
    $scope.currentPage = 0;
    $scope.device = device;
    var rotation = function() {
      $mdToast.show($mdToast.simple().content('CurrentPage: ' + $scope.currentPage + ' (' + $scope.device.pages[$scope.currentPage].id + ')'));
      $state.go('device.display.page', {deviceId: $scope.device.id, pageId: $scope.device.pages[$scope.currentPage].id});
      $scope.device.pages[$scope.currentPage]._defer = $q.defer();
      $scope.device.pages[$scope.currentPage]._defer.promise.then(function() {
          $scope.currentPage = ($scope.currentPage + 1 ) % $scope.device.pages.length;
          rotation();
      });
    };
    rotation();
    //  bridge.listen('', 'message', function(data) {
    //    console.log(data);
    //  });
  }
])
.controller('DeviceDisplayPageController', [
  '$scope',
  '$q',
  'page',
  function(
    $scope,
    $q,
    page
  ) {
    $scope.page = page;
    $scope.page.boxes.forEach(function(box) {
      box._defer = $q.defer();
    });
    // Wait for all promises.
    $q.all($scope.page.boxes.map(function(box) {
      return box._defer.promise;
    })).then(function() {
      $scope.device.pages[$scope.currentPage]._defer.resolve();
    });
  }
])
.filter('trusted', ['$sce', function ($sce) {
  return function(url) {
    return $sce.trustAsResourceUrl(url);
  };
}])
.directive('grid', [
  '$compile',
  function($compile) {
    return {
      restrict: 'E',
      scope: {
        page: '='
      },
      transclude: true,
      template: JST['assets/templates/pixelwall/grid.html'],
      controller: [
        '$scope',
        '$element',
        function($scope, $element) {
          $scope.gridsterOpts = {
            columns: $scope.page.columns,
            minColumns: $scope.page.columns,
            minRows: $scope.page.rows,
            maxRows: $scope.page.rows,
            pushing: false,
            floating: false,
            width: 'auto',
            colWidth: 'auto',
            rowHeight: ($element.parents('[ui-view=""]').height()-10) / $scope.page.rows,
            margins: [10, 10],
            outerMargin: true,
            isMobile: false,
            mobileBreakPoint: 600,
            mobileModeEnabled: true,
            defaultSizeX: 1,
            defaultSizeY: 1,
            resizable: {
              enabled: true,
              handles: 'n, e, s, w, ne, se, sw, nw',
              start: function(event, uiWidget, $element) {},
              resize: function(event, uiWidget, $element) {},
              stop: function(event, uiWidget, $element) {}
            },
            draggable: {
              enabled: true,
              //handle: '.my-class', // optional selector for resize handle
              start: function(event, uiWidget, $element) {},
              drag: function(event, uiWidget, $element) {},
              stop: function(event, uiWidget, $element) {}
            }
          };
        }
      ]
    };
  }
])
.directive('box', [
  '$compile',
  function($compile) {
    return {
      restrict: 'E',
      scope: {
        box: '=',
        timeout: '='
      },
      replace: true,
      link: function (scope, elements, attrs) {
        var html = '<box-' + scope.box.type + '/>';
        var e = angular.element(html);
        elements.append(e);
        $compile(e)(scope);
      },
      controller: [
        '$scope',
        '$element',
        '$attrs',
        '$timeout',
        'boxFactory',
        function (
          $scope,
          $element,
          $attrs,
          $timeout,
          boxFactory
        ) {
          var watcher = function(property) {
            $scope.$watch('box.' + property, function() {
              boxFactory.get({id: $scope.box.id}, function(b) {
                if (b[property] != $scope.box[property]) {
                  b[property] = $scope.box[property];
                  console.log("Changed: " + property, $scope.box[property]);
                  b.$save();
                }
              })
            }, true);
          };
          ['left', 'top', 'width', 'height'].forEach(watcher);
          $scope._timeout = $timeout(function() {
            console.log("Default page timeout finished!")
            $scope.box._defer.resolve();
          }, $scope.timeout*1000);
        }
      ]
    };
  }
])
.directive('boxHtml', [
  '$compile',
  function($compile) {
    return {
      restrict: 'E',
      replace: true,
      link: function (scope, elements, attrs) {
        var e = angular.element(scope.box.data.html || '<div>No HTML content for box!</div>');
        elements.append(e);
        $compile(e)(scope);
      }
    };
  }
])
.directive('boxIframe', [
  '$compile',
  function($compile) {
    return {
      restrict: 'E',
      replace: true,
      template: JST['assets/templates/pixelwall/box/iframe.html']
    };
  }
])
.directive('boxVideo', [
  '$compile',
  function($compile) {
    return {
      restrict: 'E',
      replace: true,
      template: JST['assets/templates/pixelwall/box/video.html'],
      controller: [
        '$scope',
        '$element',
        '$attrs',
        '$timeout',
        function (
          $scope,
          $element,
          $attrs,
          $timeout
        ) {
          $element.on('canplay', function() {
            console.log("Removing default page timeout!");
            $timeout.cancel($scope._timeout);
          });
          $element.on('ended', function() {
            console.log("Video ended, resolving defer!");
            $scope.box._defer.resolve();
          })

        }
      ]
    };
  }
])
//.run(['$rootScope', function($rootScope) {
//  $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
//    console.log('$stateChangeStart to '+toState.to+'- fired when the transition begins. toState,toParams : \n',toState, toParams);
//  });
//  $rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams){
//    console.log('$stateChangeError - fired when an error occurs during transition.');
//    console.log(arguments);
//  });
//  $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
//    console.log('$stateChangeSuccess to '+toState.name+'- fired once the state transition is complete.');
//  });
//  // $rootScope.$on('$viewContentLoading',function(event, viewConfig){
//  //   // runs on individual scopes, so putting it in "run" doesn't work.
//  //   console.log('$viewContentLoading - view begins loading - dom not rendered',viewConfig);
//  // });
//  $rootScope.$on('$viewContentLoaded',function(event){
//    console.log('$viewContentLoaded - fired after dom rendered',event);
//  });
//  $rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){
//    console.log('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name.');
//    console.log(unfoundState, fromState, fromParams);
//  });
//}])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
    .state('device', {
      url: "/d",
      template: JST['assets/templates/pixelwall/device.html'],
      controller: 'DeviceController',
      resolve: {
        devices: [
          'deviceFactory',
          function(
            deviceFactory
          ) {
            return deviceFactory.query({active: true}).$promise;
          }
        ]
      }
    })
    .state('device.display', {
      url: "/{deviceId:[0-9a-f]+}",
      views: {
        "@": {
          template: JST['assets/templates/pixelwall/display.html'],
          controller: 'DeviceDisplayController',
          resolve: {
            device: [
              '$stateParams',
              'deviceFactory',
              function(
                $stateParams,
                deviceFactory
              ) {
                return deviceFactory.get({id: $stateParams.deviceId}).$promise;
              }
            ]
          }
        }
      }
    })
    .state('device.display.page', {
      url: "/{pageId:[0-9a-f]+}",
      views: {
        "page": {
          template: JST['assets/templates/pixelwall/page.html'],
          controller: 'DeviceDisplayPageController',
          resolve: {
            page: [
              '$stateParams',
              'pageFactory',
              function(
                $stateParams,
                pageFactory
              ) {
                return pageFactory.get({id: $stateParams.pageId}).$promise;
              }
            ]
          }
        }
      }
    })
    $locationProvider.html5Mode(true);
  }
]);
