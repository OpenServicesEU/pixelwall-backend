angular.module('PixelWall')
.config([
  '$stateProvider',
  function(
    $stateProvider
  ) {
    $stateProvider
    .state('backend', {
      abstract: true,
      template: '<ui-view/>',
      resolve: {
        authenticated: [
          '$q',
          '$state',
          '$auth',
          function(
            $q,
            $state,
            $auth
          ) {
            var deferred = $q.defer();
            if (!$auth.isAuthenticated()) {
              $state.go('index');
            } else {
              deferred.resolve();
            }
            return deferred.promise;
          }
        ]
      }
    });
  }
]);
