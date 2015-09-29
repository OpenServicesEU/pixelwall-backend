angular.module('PixelWall')
.config([
  '$stateProvider',
  function(
      $stateProvider
  ) {
    $stateProvider
    .state('frontend.devices', {
      url: "/devices",
      templateUrl: 'pixelwall/states/frontend/devices.html',
      controller: 'FrontendDevicesController',
      resolve: {
        devices: [
          'deviceFactory',
          function(
            deviceFactory
          ) {
            return deviceFactory.query({active: true}).$promise;
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
    });
  }
]);
