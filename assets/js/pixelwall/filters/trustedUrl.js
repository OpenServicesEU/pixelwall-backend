angular.module('PixelWall')
.filter('trustedUrl', [
  '$sce',
  function (
    $sce
  ) {
    return function(url) {
      return $sce.trustAsResourceUrl(url);
    };
  }
]);
