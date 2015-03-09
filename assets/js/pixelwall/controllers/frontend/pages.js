angular.module('PixelWall')
.controller('FrontendPagesController', [
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
      var pageIndex = _.findIndex(pages, function(page) {
        return page.ordering[$scope.device.id] == 0;
      });
      $scope.pages.sort(sortService.pages($scope.device.id));
      $state.go(
        'frontend.devices.pages.boxes',
        {
          deviceId: $scope.device.id,
          pageId: $scope.pages[0].id
        }
      );
    }
  }
]);
