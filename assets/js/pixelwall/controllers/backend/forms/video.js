angular.module('PixelWall')
.controller('VideoFormController', [
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
    $scope.form = 'assets/templates/pixelwall/forms/video.html';
    $scope.removeVideo = function(video) {
      if (box.data.video === video) {
        box.data.video = undefined;
      }
    };
  }
]);

