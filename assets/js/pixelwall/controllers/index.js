angular.module('PixelWall')
.controller('IndexController', [
  '$scope',
  '$state',
  '$auth',
  function (
    $scope,
    $state,
    $auth
  ){
    $scope.auth = 'ldap';
    $scope.alerts = [];
    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
    $scope.login = function() {
      $auth.login(
        {
          username: $scope.username,
          password: $scope.password
        }
      )
      .then(function() {
        $scope.alerts.push({
          message: 'You have successfully logged in',
          type: 'success'
        });
        $state.go('backend.devices');

      })
      .catch(function(response) {
        $scope.alerts.push({
          message: 'Authentication failed',
          type: 'danger'
        });
      });
    };
  }
]);
