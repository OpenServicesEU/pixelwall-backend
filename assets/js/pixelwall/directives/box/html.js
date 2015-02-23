angular.module('PixelWall')
.directive('pwBoxHtml', [
    '$compile',
    function($compile) {
        return {
            restrict: 'E',
            templateUrl: 'assets/templates/pixelwall/directives/box/html.html'
        };
    }
])

