angular.module('PixelWall')
.service('backendModal', [
  '$modal',
  function (
    $modal
  ) {
    return function() {
      return $modal.open({
        backdrop: 'static',
        templateUrl: 'pixelwall/modals/backend.html'
      });
    };
  }
]);
