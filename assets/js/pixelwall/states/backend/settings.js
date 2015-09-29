angular.module('PixelWall')
.config([
  '$stateProvider',
  function(
    $stateProvider
  ) {
    $stateProvider
    .state('backend.settings', {
      url: '/settings',
      data: {
        roles: ['Admin']
      },
      templateUrl: 'pixelwall/states/backend/settings.html',
      controller: 'BackendSettingsController'
    })
  }
]);
