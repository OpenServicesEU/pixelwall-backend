angular.module('PixelWall')
.directive('pwBoxPdf', [
    '$compile',
    function($compile) {
        return {
            restrict: 'E',
            templateUrl: 'assets/templates/pixelwall/directives/box/pdf.html'
        };
    }
]);
