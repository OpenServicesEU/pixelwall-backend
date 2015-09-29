angular.module('PixelWall')
.directive('pwBoxCalendar', [
  '$compile',
  function ($compile) {
    return {
      restrict: 'E',
      templateUrl: 'pixelwall/directives/box/calendar.html'
    };
  }
]);
