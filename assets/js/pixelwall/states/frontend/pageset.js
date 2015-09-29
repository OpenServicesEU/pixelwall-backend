angular.module('PixelWall')
.config([
  '$stateProvider',
  function(
      $stateProvider
  ) {
    $stateProvider
    .state('frontend.devices.pageset', {
      url: "/{deviceId:[0-9a-f]+}/{pagesetId:[0-9a-f]+}",
      template: '<ui-view/>',
      controller: 'FrontendPagesetController',
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
            return pageFactory.query({set: $stateParams.pagesetId, sort: 'ordering'}).$promise;
          }
        ]
      }
    })
  }
]);
