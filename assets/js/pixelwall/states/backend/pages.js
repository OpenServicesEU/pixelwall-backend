angular.module('PixelWall')
.config([
  '$stateProvider',
  function(
    $stateProvider
  ) {
    $stateProvider
    .state('backend.devices.pages', {
      url: "/{deviceId:[0-9a-f]+}",
      templateUrl: 'assets/templates/pixelwall/states/backend/pages.html',
      controller: 'BackendPagesController',
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
        ],
        allPages: [
          'pageFactory',
          function(
            pageFactory
          ) {
            return pageFactory.query().$promise;
          }
        ]
      }
    });
  }
]);
