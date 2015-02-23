angular.module('PixelWall')
.directive('pwCarousel',
    function() {
        return {
            restrict: 'E',
            scope: {
                images: '=',
                interval: '=',
                start: '=',
                end: '=',
                current: '='
            },
            templateUrl: 'assets/templates/pixelwall/directives/carousel.html',
            controller: [
                '$element',
                '$interval',
                '$scope',
                function(
                    $element,
                    $interval,
                    $scope
                ) {
                    $scope.index = 0; // Initially the index is at the first image
                    $scope.active = function($index) {
                        return $index == $scope.index;
                    };
                    $scope.next = function() {
                      $scope.index < $scope.images.length - 1 ? $scope.index++ : $scope.index = 0;
                    };
                    $scope.prev = function() {
                      $scope.index > 0 ? $scope.index-- : $scope.index = $scope.images.length - 1;
                    };
                    var interval;
                    $scope.reset = function(time) {
                      if (typeof interval !== 'undefined') {
                        $interval.cancel(interval);
                      }
                      interval = $interval(function() {
                        if ($scope.index === $scope.images.length - 1) {
                          if (typeof $scope.end === 'function') {
                            $scope.end();
                          }
                        }
                        $scope.next();
                        if ($scope.index === 0) {
                          if (typeof $scope.start === 'function') {
                            $scope.start();
                          }
                        }
                      }, time);
                    };
                    $scope.$watch('index', function(newVal) {
                      $scope.images.forEach(function(image) {
                          image.visible = false; // make every image invisible
                        });
                      $scope.images[newVal].visible = true; // make the current image visible
                    });
                    $scope.$watch('interval', function(newVal) {
                      $scope.reset(newVal);
                    });
                    $scope.$on(
                      "$destroy",
                      function() {
                        $interval.cancel(interval);
                      }
                    );
                }
            ]
        };
    }
);
