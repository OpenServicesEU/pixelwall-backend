angular.module('PixelWall')
.controller('VideoStreamFormController', [
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
    $scope.form = 'assets/templates/pixelwall/forms/videostream.html';
  }
]);

