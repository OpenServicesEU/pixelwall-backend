angular.module('PixelWall')
.service('sortService', function() {
  this.pages = function(deviceId) {
    return function(a, b) {
     return a.ordering[deviceId] - b.ordering[deviceId];
    }
  };
});
