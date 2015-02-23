angular.module('PixelWall')
.directive('pwBoxCalendar', [
  '$compile',
  function ($compile) {
    return {
      restrict: 'E',
      templateUrl: 'assets/templates/pixelwall/directives/box/calendar.html'
    };
  }
]);
