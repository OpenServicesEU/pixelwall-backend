angular.module('PixelWall')
.directive('pwBounce',
    function() {
        return {
            controller: [
                '$element',
                '$interval',
                '$timeout',
                '$scope',
                function(
                    $element,
                    $interval,
                    $timeout,
                    $scope
                ) {
                    //$scope.$watch(
                    //    function() {
                    //        console.log($element.prop('scrollTopMax'));
                    //        return $element.prop('scrollTopMax');
                    //    },
                    //    function(newVal, oldVal) {
                    //        console.log(newVal, oldVal);
                    //    }
                    //);
                    $element.addClass("bounce");
                    $timeout(function() {
                        var current = 0;
                        var start = 0;
                        var direction = 1;
                        if ($element.prop('scrollHeight') > $element.prop('clientHeight')) {
                            var scroller = $interval(function() {
                                var duration = $element.prop('scrollHeight') - $element.prop('clientHeight');
                                var change = duration * direction;
                                //var pos = sinease(current, start, change, duration);
                                var pos = -change / 2 * (Math.cos(Math.PI * current / duration) - 1) + start;
                                current = current + 1;
                                // Set the current position.
                                $element.prop('scrollTop', pos);
                                // See if we went through a full circle.
                                if (current >= duration) {
                                    // Reverse direction of scroll.
                                    start = start + (duration * direction);
                                    direction = direction * -1;
                                    current = 0;
                                }
                            }, 40);
                        }
                    }, 1000);
                }
            ]
        };
    }
);
