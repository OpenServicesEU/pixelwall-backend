angular.module('PixelWall')
.controller('MapFormController', [
  '$scope',
  '$timeout',
  'leafletData',
  'box',
  'editable',
  'opened',
  function (
    $scope,
    $timeout,
    leafletData,
    box,
    editable,
    opened
  ) {
    $scope.box = box;
    $scope.editable = editable;
    if (!editable.hasOwnProperty('center')) {
      editable.center = {
        lat: 40.095,
        lng: -3.823,
        zoom: 4
      };
    }
    $scope.form = 'assets/templates/pixelwall/forms/map.html';
    opened.promise.then(function() {
      $timeout(function() {
        leafletData.getMap('editMap').then(function(map) {
          console.log("Invalidation: ", map);
          map.invalidateSize();
        });
      }, 1000);
    })
  }
]);

