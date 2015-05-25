angular.module('PixelWall')
.controller('BackendBoxesController', [
  '$scope',
  '$q',
  '$modal',
  'boxFactory',
  'boxTypes',
  'page',
  'boxes',
  function (
    $scope,
    $q,
    $modal,
    boxFactory,
    boxTypes,
    page,
    boxes
  ) {
    $scope.page = page;
    $scope.boxes = boxes;
    $scope.types = boxTypes;
    $scope.addBox = function(type) {
      var box = new boxFactory(
        {
          type: type,
          width: 1,
          height: 1,
          page: $scope.page.id,
          data: {}
        }
      );

      $scope.label = boxTypes[box.type].label;
      $scope.icon = boxTypes[box.type].icon;

      var opened = $q.defer();

      var modalInstance = $modal.open({
        templateUrl: 'assets/templates/pixelwall/modals/box.add.html',
        size: 'lg',
        controller: boxTypes[box.type].controller,
        scope: $scope,
        resolve: {
          box: function() {
            return box;
          },
          editable: function() {
            return box.data;
          },
          opened: function() {
            return opened;
          }
        }
      });

      modalInstance.opened.then(function () {
        opened.resolve();
      });
      modalInstance.result.then(function () {
        box.$save(function(b) {
          $scope.boxes.push(b);
        });
      });
    };
  }
]);
