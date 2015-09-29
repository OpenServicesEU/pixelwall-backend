angular.module('PixelWall')
.directive('pwBoxClockAnalog', [
  '$compile',
  function(
    $compile
  ) {
    return {
      restrict: 'E',
      templateUrl: 'pixelwall/directives/box/clock-analog.html'
    };
  }
]);
