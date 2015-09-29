angular.module('PixelWall')
.directive('pwBox', [
  '$compile',
  function($compile) {
    return {
      restrict: 'E',
      scope: {
        box: '=',
        duration: '@'
      },
      replace: true,
      link: function (scope, element, attrs) {
        var e = angular.element('<pw-box-' + scope.box.type + '/>');
        element.replaceWith(e);
        $compile(e)(scope);
      },
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
          // See if we have a defer on the box that we might need to resolve.
          if (typeof $scope.box._defer !== 'undefined') {
            $scope._timeout = $timeout(function() {
              console.log("Default page timeout finished!");
              $scope.box._defer.resolve();
            }, ($scope.duration * 1000) || 60000);
            $scope.$on(
              '$destroy',
              function() {
                $timeout.cancel($scope._timeout);
                $scope.box._defer.reject();
              }
            );
          }
        }
      ]
    };
  }
]);
