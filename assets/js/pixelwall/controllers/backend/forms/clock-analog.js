angular.module('PixelWall')
.controller('ClockAnalogFormController', [
  '$scope',
  'box',
  'editable',
  function (
    $scope,
    box,
    editable
  ) {
    $scope.box = box;
    $scope.editable = editable;
    $scope.form = 'pixelwall/forms/clock-analog.html';
  }
]);

