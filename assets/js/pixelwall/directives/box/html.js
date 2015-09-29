angular.module('PixelWall')
.directive('pwBoxHtml', [
    '$compile',
    function($compile) {
        return {
            restrict: 'E',
            templateUrl: 'pixelwall/directives/box/html.html'
        };
    }
]);
