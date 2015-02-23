angular.module('PixelWall')
.config([
    '$stateProvider',
    function(
        $stateProvider
    ) {
        $stateProvider
        .state('index', {
            url: '/',
            templateUrl: 'assets/templates/pixelwall/states/index.html',
            controller: 'IndexController'
        });
        return this;
    }
]);
