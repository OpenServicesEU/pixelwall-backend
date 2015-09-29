angular.module('PixelWall')
.factory('settingFactory', [
    'sailsResource',
    function(
      sailsResource
    ) {
        return sailsResource('setting', {}, {verbose: true});
    }
]);
