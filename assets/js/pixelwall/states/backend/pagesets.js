angular.module('PixelWall')
.config([
  '$stateProvider',
  function(
    $stateProvider
  ) {
    $stateProvider
    .state('backend.pagesets', {
      url: '/pagesets',
      data: {
        roles: ['Admin']
      },
      templateUrl: 'pixelwall/states/backend/pagesets.html',
      controller: 'BackendPagesetsController',
      resolve: {
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
