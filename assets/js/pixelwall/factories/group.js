angular.module('PixelWall')
.factory('groupFactory', [
    'sailsResource',
    function(
      sailsResource
    ) {
        return sailsResource('group', {}, {verbose: true});
    }
]);
