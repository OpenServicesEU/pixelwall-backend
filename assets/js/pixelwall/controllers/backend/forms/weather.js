angular.module('PixelWall')
.controller('WeatherFormController', [
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
    if (!$scope.editable.scope) {
      $scope.editable.scope = -'current';
    }
    $scope.form = 'pixelwall/forms/weather.html';
  }
]);

