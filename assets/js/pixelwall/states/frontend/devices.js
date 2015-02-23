angular.module('PixelWall')
.config([
  '$stateProvider',
  function(
      $stateProvider
  ) {
    $stateProvider
    .state('frontend.devices', {
      url: "/d",
      templateUrl: 'assets/templates/pixelwall/states/frontend/devices.html',
      controller: 'FrontendDevicesController',
      resolve: {
        devices: [
          'deviceFactory',
          function(
            deviceFactory
          ) {
            return deviceFactory.query({active: true}).$promise;
          }
        ]
      }
    });
  }
]);
