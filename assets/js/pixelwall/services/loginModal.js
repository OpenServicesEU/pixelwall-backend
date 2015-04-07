angular.module('PixelWall')
.service('loginModal', [
  '$modal',
  '$rootScope',
  'locker',
  function (
    $modal,
    $rootScope,
    locker
  ) {

    return function() {
      var instance = $modal.open({
        templateUrl: 'assets/templates/pixelwall/modals/login.html',
        controller: 'LoginModalCtrl',
        controllerAs: 'LoginModalCtrl'
      });

      return instance.result.then(function (user) {
        $rootScope.currentUser = user;
        locker.driver('session').put('user', user);
        return user;
      });
    };

  }
]);
