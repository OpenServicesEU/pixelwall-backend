angular.module('PixelWall')
.controller('BackendBoxesController', [
  '$scope',
  '$q',
  '$modal',
  '$timeout',
  'boxFactory',
  'enums',
  'page',
  'boxes',
  function (
    $scope,
    $q,
    $modal,
    $timeout,
    boxFactory,
    enums,
    page,
    boxes
  ) {
    $scope.page = page;
    $scope.boxes = boxes;
    $scope.spaces = 0;
    $scope.editable = true;
    $scope.additionPossible = true;
    $scope.gridOptions = {
      showGrid: true,
      highlightNextPosition: true
    };
    $scope.$on('wg-grid-full', function() {
      $scope.additionPossible = false;
    });
    updateGridSize();
    window.onresize = updateGridSize;

    $scope.$on('wg-grid-space-available', function() {
      $scope.additionPossible = true;
    });
    function updateGridSize() {
      $timeout(function() {
        var grid = document.getElementById('boxGrid');
        $scope.gridWidth = grid.clientWidth;
        $scope.gridHeight = grid.clientHeight;
      });
    }
    $scope.types = enums.box.types;
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

      var editable = box.data;
      $scope.label = $scope.types[box.type].label;
      $scope.icon = $scope.types[box.type].icon;

      var opened = $q.defer();

      var modalInstance = $modal.open({
        templateUrl: 'pixelwall/modals/box.add.html',
        size: 'lg',
        controller: $scope.types[box.type].controller,
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
        box.$save(function(box) {
          $scope.boxes.push(box);
        })
      });
    };
  }
]);
