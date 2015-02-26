angular.module('PixelWall')
.directive('pwBox', [
  '$compile',
  function($compile) {
    return {
      restrict: 'E',
      scope: {
        box: '=',
        timeout: '='
      },
      replace: true,
      link: function (scope, elements, attrs) {
        var html = '<pw-box-' + scope.box.type + '/>';
        var e = angular.element(html);
        e.attr('ng-style', '{"font-size": "" + box.scale * 100 + "%"}')
        elements.replaceWith(e);
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
            }, $scope.timeout*1000);
          }
          $scope.$watch(
            'box',
            _.debounce(
              function(newBox, oldBox) {
                if (newBox === oldBox) {
                  return;
                }
                var changed = ['left', 'top', 'width', 'height', 'scale'].map(function(property) {
                  return newBox[property] !== oldBox[property];
                });
                if (changed.indexOf(true) >= 0) {
                  $scope.box.$save();
                }
              },
              1000
            ),
            true
          );
        }
      ]
    };
  }
]);
