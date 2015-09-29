angular.module('PixelWall')
.controller('ImagesFormController', [
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
    $scope.form = 'pixelwall/forms/images.html';
    $scope.imageSortableOptions = {
      axis: 'y'
    };
    $scope.removeImage = function($index) {
      box.data.images.splice($index, 1);
    };
  }
]);

