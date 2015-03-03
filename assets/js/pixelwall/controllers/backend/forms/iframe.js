angular.module('PixelWall')
.controller('IframeFormController', [
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
    $scope.form = 'assets/templates/pixelwall/forms/iframe.html';
  }
]);

