angular.module('PixelWall')
.directive('pwBoxIframe', [
    '$compile',
    function($compile) {
        return {
            restrict: 'E',
            templateUrl: 'pixelwall/directives/box/iframe.html'
        };
    }
]);
