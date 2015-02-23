angular.module('PixelWall')
.controller('FrontendBoxesController', [
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
      $state.go(
        'frontend.devices.pages.boxes',
        {
          deviceId: $scope.$parent.device.id,
          pageId: $scope.$parent.pages[$scope.$parent.currentPage].id
        }
      );
    });
  }
]);
