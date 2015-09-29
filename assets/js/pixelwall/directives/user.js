angular.module('PixelWall')
.directive('pwUser', [
  function() {
    return {
      restrict: 'E',
      scope: true,
      template: '{{ username }}',
      controller: [
        '$scope',
        '$rootScope',
        function(
          $scope,
          $rootScope
        ) {
          $scope.username = $rootScope.currentUser.auth.username;
        }
      ]
    };
  }
]);
