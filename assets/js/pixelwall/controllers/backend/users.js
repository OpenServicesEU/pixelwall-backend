angular.module('PixelWall')
.controller('BackendUsersController', [
  '$scope',
  '$modal',
  'userFactory',
  'users',
  'groups',
  function (
    $scope,
    $modal,
    userFactory,
    users,
    groups
  ) {
    $scope.users = users;
    $scope.addUser = function() {
      $scope.inserted = new userFactory({
        name: '',
        active: false
      });
      $scope.users.push($scope.inserted);
    };
    $scope.saveUser = function(user, $data) {
      angular.extend(user, $data);
      if (user == $scope.inserted) {
        $scope.inserted = undefined;
      }
      return user.$save();
    };
    $scope.cancelUser = function(user, $index) {
      if (user == $scope.inserted) {
        $scope.users.splice($index, 1);
        $scope.inserted = undefined;
      }
    };
    $scope.removeUser = function(user) {
      var modalInstance = $modal.open({
        templateUrl: 'pixelwall/modals/user.delete.html',
        controller: [
          '$scope',
          'user',
          function(
            $scope,
            user
          ) {
            $scope.user = user;
          }
        ],
        resolve: {
          user: function () {
            return user;
          }
        }
      });
      modalInstance.result.then(function () {
        return user.$delete();
      });
    };
    $scope.gridsterOptions = {
      columns: 8,
      outerMargin: true,
      defaultSizeX: 2,
      defaultSizeY: 1,
      draggable: {
        enabled: false
      },
      resizable: {
        enabled: false
      }
    };
  }
]);
