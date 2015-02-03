angular.module(
  'PixelWallFrontEnd',
  [
    'PixelWallCommon'
  ]
)
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
  'sortService',
  'bridgeFactory',
  'device',
  'pages',
  function(
    $scope,
    $state,
    sortService,
    bridgeFactory,
    device,
    pages
  ) {
    $scope.device = device;
    $scope.pages = pages;
    $scope.currentPage = 0;
    //  bridge.listen('', 'message', function(data) {
    //    console.log(data);
    //  });
    if ($scope.pages.length > 0) {
      var pageIndex = _.findIndex(pages, function(page) {
        return page.ordering[$scope.device.id] == 0;
      });
      $scope.pages.sort(sortService.pages($scope.device.id));
      $state.go('device.page', {deviceId: $scope.device.id, pageId: $scope.pages[0].id});
    }
  }
])
.controller('PageController', [
  '$scope',
  '$state',
  '$q',
  'sortService',
  'page',
  'boxes',
  function(
    $scope,
    $state,
    $q,
    sortService,
    page,
    boxes
  ) {
    $scope.page = page;
    $scope.boxes = boxes;
    $scope.boxes.forEach(function(box) {
      box._defer = $q.defer();
    });
    // Wait for all promises.
    $q.all($scope.boxes.map(function(box) {
      return box._defer.promise;
    })).then(function() {
      $scope.$parent.currentPage = ($scope.$parent.currentPage + 1 ) % $scope.$parent.pages.length;
      $state.go('device.page', {deviceId: $scope.$parent.device.id, pageId: $scope.$parent.pages[$scope.$parent.currentPage].id});
    });
  }
])
.controller('OverlayBoxController', [function() {}])
.config([
  '$stateProvider',
  function(
      $stateProvider
  ) {
    $stateProvider
    .state('select', {
      url: "/d",
      templateUrl: 'assets/templates/pixelwall/select.html',
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
      templateUrl: 'assets/templates/pixelwall/device.html',
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
        ],
        pages: [
          '$stateParams',
          'pageFactory',
          function(
            $stateParams,
            pageFactory
          ) {
            return pageFactory.query({devices: $stateParams.deviceId}).$promise;
          }
        ]
      }
    })
    .state('device.page', {
      url: "/{pageId:[0-9a-f]+}",
      templateUrl: 'assets/templates/pixelwall/page.html',
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
        ],
        boxes: [
          '$stateParams',
          'boxFactory',
          function(
            $stateParams,
            boxFactory
          ) {
            return boxFactory.query({page: $stateParams.pageId}).$promise;
          }
        ]
      }
    })
  }
]);
