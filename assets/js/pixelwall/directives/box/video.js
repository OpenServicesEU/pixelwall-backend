angular.module('PixelWall')
.directive('pwBoxVideo', [
  '$compile',
  function($compile) {
    return {
      restrict: 'E',
      templateUrl: 'pixelwall/directives/box/video.html',
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
          if (typeof $scope._timeout !== 'undefined') {
            $element.on('canplay', function() {
              console.log("Removing default page timeout!", $element);
              $timeout.cancel($scope._timeout);
            });
          }
          if (typeof $scope.box._defer !== 'undefined') {
            $element.on('ended', function() {
              console.log("Video ended, resolving defer!", $element);
              $scope.box._defer.resolve();
            });
          }
        }
      ]
    };
  }
]);
