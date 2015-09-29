angular.module('PixelWall')
.service('loginModal', [
  '$modal',
  '$rootScope',
  '$q',
  'locker',
  function (
    $modal,
    $rootScope,
    $q,
    locker
  ) {

    return function() {
      var opened = $q.defer();
      var rendered = $q.defer();
      var modalInstance = $modal.open({
        templateUrl: 'pixelwall/modals/login.html',
        controller: 'LoginModalCtrl',
        controllerAs: 'LoginModalCtrl',
        resolve: {
          opened: function() {
            return opened;
          },
          rendered: function() {
            return rendered;
          }
        }
      });

      modalInstance.opened.then(function() {
        opened.resolve();
      });
      modalInstance.rendered.then(function() {
        rendered.resolve();
      });

      return modalInstance.result.then(function(user) {
        $rootScope.currentUser = user;
        locker.driver('session').put('user', user);
        return user;
      });
    };

  }
]);
