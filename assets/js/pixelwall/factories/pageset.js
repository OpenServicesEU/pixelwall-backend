angular.module('PixelWall')
.factory('pagesetFactory', [
    'sailsResource',
    function(
      sailsResource
    ) {
        return sailsResource('pageset', {}, {verbose: true});
    }
]);
