angular.module('PixelWall')
.factory('deviceFactory', [
    'sailsResource',
    function(
      sailsResource
    ) {
        return sailsResource('device', {}, {verbose: true});
    }
]);
