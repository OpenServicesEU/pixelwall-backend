angular.module('PixelWall')
.directive('pwBoxIframe', [
    '$compile',
    function($compile) {
        return {
            restrict: 'E',
            templateUrl: 'assets/templates/pixelwall/directives/box/iframe.html'
        };
    }
]);
