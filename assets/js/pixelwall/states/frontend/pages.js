angular.module('PixelWall')
.config([
  '$stateProvider',
  function(
      $stateProvider
  ) {
    $stateProvider
    .state('frontend.devices.pages', {
      url: "/{deviceId:[0-9a-f]+}",
      template: '<ui-view/>',
      controller: 'FrontendPagesController',
      resolve: {
        device: [
          '$stateParams',
          'deviceFactory',
          function(
            $stateParams,
            deviceFactory
          ) {
            return deviceFactory.get({id: $stateParams.deviceId}).$promise;
          }
        ],
        pages: [
          '$stateParams',
          'pageFactory',
          function(
            $stateParams,
            pageFactory
          ) {
            return pageFactory.query({devices: $stateParams.deviceId}).$promise;
          }
        ]
      }
    })
  }
]);
