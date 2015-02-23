angular.module('PixelWall')
.controller('FrontendDevicesController', [
  '$scope',
  '$state',
  'devices',
  function (
    $scope,
    $state,
    devices
  ) {
    $scope.$state = $state;
    $scope.devices = devices;
  }
]);
