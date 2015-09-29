angular.module('PixelWall')
.config([
    '$stateProvider',
    function(
        $stateProvider
    ) {
        $stateProvider
        .state('index', {
            url: '/',
            templateUrl: 'pixelwall/states/index.html',
            controller: 'IndexController'
        });
        return this;
    }
]);
