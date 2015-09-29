angular.module('PixelWall')
.config([
  '$stateProvider',
  function(
    $stateProvider
  ) {
    $stateProvider
    .state('backend.pagesets.pages', {
      url: "/{pagesetId:[0-9a-f]+}",
      templateUrl: 'pixelwall/states/backend/pages.html',
      controller: 'BackendPagesController',
      resolve: {
        pageset: [
          '$stateParams',
          'pagesetFactory',
          function(
            $stateParams,
            pagesetFactory
          ) {
            return pagesetFactory.get({id: $stateParams.pagesetId}).$promise;
          }
        ],
        pages: [
          '$stateParams',
          'pageFactory',
          function(
            $stateParams,
            pageFactory
          ) {
            return pageFactory.query({set: $stateParams.pagesetId, sort: "ordering"}).$promise;
          }
        ]
      }
    });
  }
]);
