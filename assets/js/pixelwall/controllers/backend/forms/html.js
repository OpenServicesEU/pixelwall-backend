angular.module('PixelWall')
.controller('HtmlFormController', [
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
    $scope.form = 'pixelwall/forms/html.html';
  }
]);

