angular.module('PixelWall')
.config([
  '$stateProvider',
  function(
    $stateProvider
  ) {
    $stateProvider
    .state('backend.devices.pages.boxes', {
      url: "/{pageId:[0-9a-f]+}",
      templateUrl: 'assets/templates/pixelwall/states/backend/boxes.html',
      controller: 'BackendBoxesController',
      resolve: {
        page: [
          '$stateParams',
          'pageFactory',
          function(
            $stateParams,
            pageFactory
          ) {
            return pageFactory.get({id: $stateParams.pageId}).$promise;
          }
        ],
        boxes: [
          '$stateParams',
          'boxFactory',
          function(
            $stateParams,
            boxFactory
          ) {
            return boxFactory.query({page: $stateParams.pageId}).$promise;
          }
        ]
      }
    });
  }
]);
