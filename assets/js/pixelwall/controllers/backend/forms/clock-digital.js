angular.module('PixelWall')
.controller('ClockDigitalFormController', [
  '$scope',
  '$interval',
  'box',
  'editable',
  function (
    $scope,
    $interval,
    box,
    editable
  ) {
    $scope.box = box;
    $scope.editable = editable;
    $scope.form = 'pixelwall/forms/clock-digital.html';
    var tick = $interval(function () {
      $scope.currentTime = new Date().getSeconds();
    }, 1000);
    $scope.$on(
      "$destroy",
      function() {
        $interval.cancel(tick);
      }
    );
  }
]);

