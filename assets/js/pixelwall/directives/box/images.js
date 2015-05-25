angular.module('PixelWall')
.directive('pwBoxImages', [
    '$compile',
    function($compile) {
        return {
            restrict: 'E',
            templateUrl: 'assets/templates/pixelwall/directives/box/images.html',
            controller: [
                '$scope',
                '$element',
                '$attrs',
                '$timeout',
                function (
                    $scope,
                    $element,
                    $attrs,
                    $timeout
                ) {
                    $scope.images = $scope.box.data.images.map(function(image) {
                      return {
                        src: image
                      };
                    });
                    if (
                      typeof $scope.box.data.images !== 'undefined' &&
                      typeof $scope._timeout !== 'undefined'
                    ) {
                        $timeout.cancel($scope._timeout);
                        var resolver = $timeout(function() {
                            console.log("All slides played!");
                            $scope.box._defer.resolve();
                        }, $scope.box.data.images.length * $scope.box.data.interval * 1000);
                    }
                    $scope.$watch('box.data.interval', function(newVal) {
                      console.log('Interval: ', newVal);
                    });

                }
            ]
        };
    }
]);
