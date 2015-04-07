angular.module('PixelWall')
.controller('LoginModalCtrl', [
  '$scope',
  '$http',
  function (
    $scope,
    $http
  ) {

    $scope.type = 'ldap';
    $scope.submit = function (username, password, type) {
      $http({
        url: '/auth/login?type=' + type,
        method: 'POST',
        data: {
          username: username,
          password: password
        }
      }).success(function (data, status, headers, config) {
        $scope.$close(data);
      }).error(function (data, status, headers, config) {
        // TODO
      });
    };

  }
]);
