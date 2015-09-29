angular.module('PixelWall')
.directive('pwBoxClockDigital', [
  '$compile',
  function(
    $compile
  ) {
    return {
      restrict: 'E',
      templateUrl: 'pixelwall/directives/box/clock-digital.html'
    };
  }
]);
