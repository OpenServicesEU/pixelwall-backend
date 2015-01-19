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
        ]
      }
    })
  }
]);
