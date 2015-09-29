angular.module('PixelWall')
.controller('VideoFormController', [
  '$scope',
  'Upload',
  'box',
  'editable',
  function (
    $scope,
    Upload,
    box,
    editable
  ) {
    $scope.box = box;
    $scope.editable = editable;
    $scope.form = 'pixelwall/forms/video.html';
    $scope.uploadFile = undefined;
    $scope.uploadProgress = 0;
    $scope.upload = function ($file) {
      $scope.uploadFile = $file;
      Upload.upload({
        url: '/u/video',
        file: $file,
        fileFormDataName: 'video'
      }).progress(function (evt) {
        $scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
      }).success(function (data, status, headers, config) {
        $scope.uploadFile = undefined;
        $scope.uploadProgress = 0;
        $scope.editable.src = data.files.pop().src;
      });
    };
    $scope.removeVideo = function(video) {
      if (box.data.video === video) {
        box.data.video = undefined;
      }
    };
  }
]);

