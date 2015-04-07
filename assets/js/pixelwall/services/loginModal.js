angular.module('PixelWall')
.service('loginModal', [
  '$modal',
  '$rootScope',
  function (
    $modal,
    $rootScope
  ) {

    return function() {
      var instance = $modal.open({
        templateUrl: 'assets/templates/pixelwall/modals/login.html',
        controller: 'LoginModalCtrl',
        controllerAs: 'LoginModalCtrl'
      });

      return instance.result.then(function (user) {
        $rootScope.currentUser = user;
        return user;
      });
    };

  }
]);
