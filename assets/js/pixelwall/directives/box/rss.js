angular.module('PixelWall')
.directive('pwBoxRss', [
    '$compile',
    function($compile) {
        return {
            restrict: 'E',
            templateUrl: 'assets/templates/pixelwall/directives/box/rss.html'
        };
    }
]);
