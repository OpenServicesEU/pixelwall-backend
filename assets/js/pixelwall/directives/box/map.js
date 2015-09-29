angular.module('PixelWall')
.directive('pwBoxMap', [
  '$compile',
  function($compile) {
    return {
      restrict: 'E',
      templateUrl: 'pixelwall/directives/box/map.html',
      controller: [
        '$scope',
        '$timeout',
        'leafletData',
        'enums',
        function (
          $scope,
          $timeout,
          leafletData,
          enums
        ) {
          $scope.defaults = {
            zoomControl: false,
            dragging: false,
            keyboard: false,
            doubleClickZoom: false,
            scrollWheelZoom: false
          };
          $scope.getTiles = function(name) {
            return enums.box.map.tiles[name];
          };
          $timeout(function() {
            leafletData.getMap($scope.box.id + "-map").then(function(map) {
              console.log("Invalidation: ", map);
              map.invalidateSize();
            });
          }, 500);
        }
      ]
    };
  }
])
