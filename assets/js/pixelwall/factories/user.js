angular.module('PixelWall')
.factory('userFactory', [
    'sailsResource',
    function(
      sailsResource
    ) {
        return sailsResource('user', {}, {verbose: true});
    }
]);
