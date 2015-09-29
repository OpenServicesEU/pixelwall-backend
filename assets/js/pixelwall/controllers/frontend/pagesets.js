angular.module('PixelWall')
.controller('FrontendPagesetController', [
  '$scope',
  '$state',
  'locker',
  'sortService',
  'bridgeFactory',
  'device',
  'pages',
  function(
    $scope,
    $state,
    locker,
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
    if (navigator.userAgent == "Pixelwall") {
      locker.driver('local').put('device', device.id);
    }
    if ($scope.pages.length > 0) {
      $state.go(
        'frontend.devices.pageset.boxes',
        {
          deviceId: $scope.device.id,
          pagesetId: $scope.device.set,
          pageId: $scope.pages[$scope.currentPage].id
        }
      );
    }
  }
]);
