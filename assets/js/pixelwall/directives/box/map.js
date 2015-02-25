angular.module('PixelWall')
.directive('pwBoxMap', [
    '$compile',
    function($compile) {
        return {
            restrict: 'E',
            templateUrl: 'assets/templates/pixelwall/directives/box/map.html'
        };
    }
])
