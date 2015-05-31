angular.module('PixelWall')
.directive('pwBoxPdf', [
    '$compile',
    function($compile) {
        return {
            restrict: 'E',
            templateUrl: 'assets/templates/pixelwall/directives/box/pdf.html',
            controller: [
                '$scope',
                '$element',
                '$attrs',
                function(
                    $scope,
                    $element,
                    $attrs) {

                    $scope.pdfUrl = '/u/pdf/' + $scope.box.data.pdf.src;
                }
            ]
        };
    }
]);
