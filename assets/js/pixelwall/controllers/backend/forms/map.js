angular.module('PixelWall')
.controller('MapFormController', [
  '$scope',
  '$timeout',
  'leafletData',
  'enums',
  'box',
  'editable',
  'opened',
  'rendered',
  function (
    $scope,
    $timeout,
    leafletData,
    enums,
    box,
    editable,
    opened,
    rendered
  ) {
    $scope.box = box;
    $scope.editable = editable;
    $scope.tiles = enums.box.map.tiles;
    $scope.defaults = {
      zoomControl: true
    };
    if (!$scope.editable.hasOwnProperty('center')) {
      $scope.editable.center = {
        lat: 40.095,
        lng: -3.823,
        zoom: 4
      };
    }
    if (!$scope.editable.hasOwnProperty('geojson')) {
      $scope.editable.geojson = { 
        data: {
          type: 'FeatureCollection',
          features: []
        },
        options: {
          style: function(feature) {
            return {color: "#ffffff"};
          },
          pointToLayer: function(feature, latlng) {
            return new L.CircleMarker(latlng, {radius: 10, fillOpacity: 0.85});
          }
        }
      }
    }
    if (!$scope.editable.hasOwnProperty('tiles')) {
      $scope.editable.tiles = enums.box.map.tiles.openstreetmap;
    }
    $scope.getTiles = function(name) {
      return enums.box.map.tiles[name];
    };
    $scope.$on("leafletDirectiveMap.click", function(event, args){
      var leafEvent = args.leafletEvent;
      console.log(leafEvent);
      $scope.editable.geojson.data.features.push({
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            leafEvent.latlng.lng,
            leafEvent.latlng.lat
          ]
        },
        "properties": { 
          "name": "Location A",
          "category": "Store"
        }
      });
      leafletData.getMap('editMap').then(function(map) {
        map.invalidateSize();
      });
    });
    $scope.form = 'pixelwall/forms/map.html';
    rendered.promise.then(function() {
      $timeout(function() {
        leafletData.getMap('editMap').then(function(map) {
          map.invalidateSize();
        });
      }, 500);
    })
  }
]);

