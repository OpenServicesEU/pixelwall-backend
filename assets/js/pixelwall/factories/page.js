angular.module('PixelWall')
.factory('pageFactory', [
    'sailsResource',
    function(
      sailsResource
    ) {
        return sailsResource('page', {}, {verbose: true});
    }
]);
