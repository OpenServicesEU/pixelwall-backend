angular.module('PixelWall')
.controller('LoginModalCtrl', [
  '$scope',
  '$http',
  '$timeout',
  'opened',
  'rendered',
  function (
    $scope,
    $http,
    $timeout,
    opened,
    rendered
  ) {
    $scope.rendered = rendered;
    $scope.alerts = [];
    $scope.type = 'ldap';
    $scope.submit = function (username, password, type) {
      $http({
        url: '/api/auth/login?type=' + type,
        method: 'POST',
        data: {
          username: username,
          password: password
        }
      }).success(function (data, status, headers, config) {
        $scope.$close(data);
      }).error(function (data, status, headers, config) {
        var alert = {
          type: 'warning',
          msg: 'Could not log you in! Status: ' + status,
          timer: $timeout(function() {}, 3000)
        };
        alert.timer.then(function() {
          $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
        });
        $scope.$on(
          "$destroy",
          function() {
            $timeout.cancel(alert.timer);
          }
        );
        $scope.alerts.push(alert);
      });
    };
    $scope.closeAlert = function(index) {
      $timeout.cancel($scope.alerts[index].timer);
      $scope.alerts.splice(index, 1);
    };
  }
]);
