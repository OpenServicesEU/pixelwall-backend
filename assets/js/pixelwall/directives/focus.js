angular.module('PixelWall')
.directive(
  'pwFocus',
  function() {
    return {
      restrict: 'A',
      controller: [
        '$scope',
        '$element',
        '$attrs',
        '$q',
        function(
          $scope,
          $element,
          $attrs,
          $q
        ) {
          $q.when($scope[$attrs.pwFocus].promise).then(function() {
            $element.focus();
          });
        }
      ]
    };
  }
);
