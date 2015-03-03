angular.module('PixelWall')
.controller('BackendBoxOverlayController', [
  '$scope',
  '$modal',
  'boxTypes',
  function (
    $scope,
    $modal,
    boxTypes
  ){
    $scope.editBox = function(box) {
      var editable = angular.copy(box.data);
      $scope.label = boxTypes[box.type].label;
      $scope.icon = boxTypes[box.type].icon;
      var modalInstance = $modal.open({
        templateUrl: 'assets/templates/pixelwall/modals/box.edit.html',
        size: 'lg',
        controller: boxTypes[box.type].controller,
        scope: $scope,
        resolve: {
          box: function() {
            return box;
          },
          editable: function() {
            return editable;
          },
          modal: function() {
            return modalInstance;
          }
        }
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
        box.$delete();
      });
    };
  }
])

