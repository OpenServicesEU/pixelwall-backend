angular.module('PixelWall')
.config([
  '$stateProvider',
  function(
    $stateProvider
  ) {
    $stateProvider
    .state('backend.devices', {
      url: '/devices',
      data: {
        roles: ['Admin']
      },
      templateUrl: 'pixelwall/states/backend/devices.html',
      controller: 'BackendDevicesController',
      resolve: {
        devices: [
          'deviceFactory',
          function(
            deviceFactory
          ) {
            return deviceFactory.query().$promise;
          }
        ],
        pagesets: [
          'pagesetFactory',
          function(
            pagesetFactory
          ) {
            return pagesetFactory.query().$promise;
          }
        ]
      }
    })
  }
]);
