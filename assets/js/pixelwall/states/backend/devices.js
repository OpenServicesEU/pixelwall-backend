angular.module('PixelWall')
.config([
  '$stateProvider',
  function(
    $stateProvider
  ) {
    $stateProvider
    .state('backend.devices', {
      url: '/b',
      data: {
        roles: ['Admin']
      },
      templateUrl: 'assets/templates/pixelwall/states/backend/devices.html',
      controller: 'BackendDevicesController',
      resolve: {
        devices: [
          'deviceFactory',
          function(
            deviceFactory
          ) {
            return deviceFactory.query().$promise;
          }
        ]
      }
    })
  }
]);
