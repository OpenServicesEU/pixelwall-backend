angular.module('PixelWall')
.controller('BackendBoxOverlayController', [
  '$scope',
  '$modal',
  function (
    $scope,
    $modal
  ){
    $scope.editBox = function(box) {
      var editable = angular.copy(box.data);
      var modalInstance = $modal.open({
        templateUrl: 'assets/templates/pixelwall/modals/box.edit.html',
        controller: [
          '$scope',
          function(
            $scope
          ) {
            $scope.box = box;
            $scope.editable = editable;
            $scope.form = 'assets/templates/pixelwall/forms/' + box.type + '.html';
            $scope.removeVideo = function(video) {
              if (editable.video === video) {
                editable.video = undefined;
              }
            };
            $scope.removeImage = function($index) {
              editable.images.splice($index, 1);
            };
            $scope.imageSortableOptions = {
              axis: 'y'
            }
          }
        ]
      });

      modalInstance.result.then(function () {
        box.data = editable;
        box.$save();
      });
    };
    $scope.removeBox = function(box) {
      var modalInstance = $modal.open({
        templateUrl: 'assets/templates/pixelwall/modals/box.delete.html',
        controller: [
          '$scope',
          function(
            $scope
          ) {
            $scope.box = box;
          }
        ]
      });

      modalInstance.result.then(function () {
        return box.$delete();
      });
    };
  }
])

