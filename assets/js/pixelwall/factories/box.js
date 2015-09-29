angular.module('PixelWall')
.factory('boxFactory', [
    'sailsResource',
    function(
      sailsResource
    ) {
        return sailsResource('box');
    }
]);
