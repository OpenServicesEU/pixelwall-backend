angular.module('PixelWall')
.controller('IndexController', [
  '$scope',
  '$state',
  'locker',
  function (
    $scope,
    $state,
    locker
  ){
    if (navigator.userAgent == "Pixelwall") {
      if (locker.driver('local').has('device')) {
        $state.go(
          'frontend.devices.pages',
          {
            deviceId: locker.driver('local').get('device')
          }
        );
      } else {
        $state.go('frontend.devices');
      }
    }
    $scope.credentials = {};
  }
]);
