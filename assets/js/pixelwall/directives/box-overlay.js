angular.module('PixelWall')
.directive('pwBoxOverlay', [
  '$compile',
  function($compile) {
    return {
      restrict: 'E',
      scope: {
        box: '='
      },
      replace: true,
      templateUrl: 'pixelwall/directives/box-overlay.html',
      controller: [
        '$scope',
        '$element',
        '$attrs',
        '$q',
        '$modal',
        'lodash',
        'enums',
        function (
          $scope,
          $element,
          $attrs,
          $q,
          $modal,
          lodash,
          enums
        ) {
          $scope.$watch(
            'box',
            lodash.debounce(
              function(newBox, oldBox) {
                if (newBox === oldBox) {
                  return;
                }
                var changed = ['left', 'top', 'width', 'height'].map(function(property) {
                  return newBox[property] !== oldBox[property];
                });
                if (changed.indexOf(true) >= 0) {
                  $scope.box.$save();
                }
              },
              1000
            ),
            true
          );
          $scope.editBox = function(box) {
            var editable = angular.copy(box.data);
            $scope.label = enums.box.types[box.type].label;
            $scope.icon = enums.box.types[box.type].icon;
            var opened = $q.defer();
            var rendered = $q.defer();
            var modalInstance = $modal.open({
              templateUrl: 'pixelwall/modals/box.edit.html',
              size: 'lg',
              controller: enums.box.types[box.type].controller,
              scope: $scope,
              resolve: {
                box: function() {
                  return box;
                },
                editable: function() {
                  return editable;
                },
                opened: function() {
                  return opened;
                },
                rendered: function() {
                  return rendered;
                }
              }
            });

            modalInstance.opened.then(function () {
              opened.resolve();
            });
            modalInstance.rendered.then(function () {
              rendered.resolve();
            });
            modalInstance.result.then(function () {
              box.data = editable;
              box.$save();
            });
          };

          $scope.removeBox = function(box) {
            var modalInstance = $modal.open({
              templateUrl: 'pixelwall/modals/box.delete.html',
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
      ]
    };
  }
]);
