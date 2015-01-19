angular.module(
  'PixelWallFrontEnd',
  [
    'ngAnimate',
    'ui.bootstrap',
    'ui.router',
    'gridster',
    'sailsResource'
  ]
)
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
.filter('trustedUrl', ['$sce', function ($sce) {
  return function(url) {
    return $sce.trustAsResourceUrl(url);
  };
}])
.filter('trustedHtml', ['$sce', function ($sce) {
  return function(html) {
    return $sce.trustAsHtml(html);
  };
}])
.controller('SelectController', [
  '$scope',
  'devices',
  function (
    $scope,
    devices
  ) {
    $scope.devices = devices;
  }
])
.controller('DeviceController', [
  '$scope',
  '$state',
  'bridgeFactory',
  'device',
  function(
    $scope,
    $state,
    bridgeFactory,
    device
  ) {
    $scope.device = device;
    $scope.currentPage = 0;
    //  bridge.listen('', 'message', function(data) {
    //    console.log(data);
    //  });
    if ($scope.device.pages.length > 0) {
      $state.go('device.page', {deviceId: $scope.device.id, pageId: $scope.device.pages[$scope.currentPage].id});
    }
  }
])
.controller('PageController', [
  '$scope',
  '$state',
  '$q',
  'page',
  function(
    $scope,
    $state,
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
      $scope.$parent.currentPage = ($scope.$parent.currentPage + 1 ) % $scope.device.pages.length;
      $state.go('device.page', {deviceId: $scope.device.id, pageId: $scope.device.pages[$scope.$parent.currentPage].id});
    });
  }
])
.controller('OverlayBoxController', [function() {}])
.directive('pwBounce',
    function() {
        return {
            controller: [
                '$element',
                '$interval',
                '$timeout',
                '$scope',
                function(
                    $element,
                    $interval,
                    $timeout,
                    $scope
                ) {
                    $scope.$watch(
                        function() {
                            console.log($element.prop('clientHeight'));
                            return $element.prop('clientHeight');
                        },
                        function(newVal, oldVal) {
                            console.log(newVal, oldVal);
                        }
                    );
                    $scope.$watch(
                        function() {
                            console.log($element.prop('scrollHeight'));
                            return $element.prop('scrollHeight');
                        },
                        function(newVal, oldVal) {
                            console.log(newVal, oldVal);
                        }
                    );
                    $timeout(function() {
                        var current = 0;
                        var start = 0;
                        var direction = 1;
                        if ($element.prop('scrollHeight') > $element.prop('clientHeight')) {
                            var scroller = $interval(function() {
                                var duration = $element.prop('scrollHeight') - $element.prop('clientHeight');
                                var change = duration * direction;
                                //var pos = sinease(current, start, change, duration);
                                var pos = -change / 2 * (Math.cos(Math.PI * current / duration) - 1) + start;
                                current = current + 1;
                                // Set the current position.
                                $scope.apply(function() {
                                    $element.prop('scrollTop', pos);
                                });
                                // See if we went through a full circle.
                                if (current >= duration) {
                                    // Reverse direction of scroll.
                                    start = start + (duration * direction);
                                    direction = direction * -1;
                                    current = 0;
                                }
                            }, 40);
                        }
                    }, 1000);
                }
            ]
        };
    }
)
.directive('pwGrid', [
  '$compile',
  function($compile) {
    return {
      restrict: 'E',
      scope: {
        rows: '=',
        columns: '=',
        timeout: '=',
        boxes: '='
      },
      transclude: true,
      template: JST['assets/templates/pixelwall/grid.html'],
      controller: [
        '$scope',
        '$element',
        function($scope, $element) {
          $scope.gridsterOpts = {
            columns: $scope.columns,
            minColumns: $scope.columns,
            minRows: $scope.rows,
            maxRows: $scope.rows,
            pushing: false,
            floating: false,
            width: 'auto',
            colWidth: 'auto',
            rowHeight: ($element.parents('[ui-view=""]').height()-10) / $scope.rows,
            margins: [10, 10],
            outerMargin: true,
            isMobile: false,
            mobileBreakPoint: 600,
            mobileModeEnabled: true,
            defaultSizeX: 1,
            defaultSizeY: 1,
            resizable: {
              enabled: false
            },
            draggable: {
              enabled: false
            }
          };
        }
      ]
    };
  }
])
.directive('pwBox', [
  '$compile',
  function($compile) {
    return {
      restrict: 'E',
      scope: {
        box: '=',
        timeout: '='
      },
      link: function (scope, elements, attrs) {
        var html = '<pw-box-' + scope.box.type + '/>';
        var e = angular.element(html);
        elements.replaceWith(e);
        $compile(e)(scope);
      },
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
          $scope._timeout = $timeout(function() {
            console.log("Default page timeout finished!")
            $scope.box._defer.resolve();
          }, $scope.timeout*1000);
        }
      ]
    };
  }
])
.directive('pwBoxHtml', [
    '$compile',
    function($compile) {
        return {
            restrict: 'E',
            replace: true,
            template: JST['assets/templates/pixelwall/box/html.html']
        };
    }
])
.directive('pwBoxIframe', [
    '$compile',
    function($compile) {
        return {
            restrict: 'E',
            replace: true,
            template: JST['assets/templates/pixelwall/box/iframe.html']
        };
    }
])
.directive('pwBoxVideo', [
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
  '$locationProvider',
  function($stateProvider, $locationProvider) {
    $stateProvider
    .state('select', {
      url: "/d",
      template: JST['assets/templates/pixelwall/select.html'],
      controller: 'SelectController',
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
    .state('device', {
      url: "/d/{deviceId:[0-9a-f]+}",
      template: JST['assets/templates/pixelwall/device.html'],
      controller: 'DeviceController',
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
    })
    .state('device.page', {
      url: "/{pageId:[0-9a-f]+}",
      template: JST['assets/templates/pixelwall/page.html'],
      controller: 'PageController',
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
    })
    $locationProvider.html5Mode(true);
  }
]);
