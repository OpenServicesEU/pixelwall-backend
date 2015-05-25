angular.module('PixelWall')
.directive('pwBoxRssL', [
    '$compile',
    function($compile) {
        return {
            restrict: 'E',
            templateUrl: 'assets/templates/pixelwall/directives/box/rss.html'
        };
    }
]);
