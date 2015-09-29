angular.module('PixelWall')
.directive('pwBoxVideoStream', [
    '$compile',
    function($compile) {
        return {
            restrict: 'E',
            templateUrl: 'pixelwall/directives/box/videostream.html',
            controller: [
                '$scope',
                '$element',
                '$attrs',
                function (
                    $scope,
                    $element,
                    $attrs
                ) {
                }
            ]
        };
    }
]);
