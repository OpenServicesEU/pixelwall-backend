angular.module('PixelWall')
.config([
  '$stateProvider',
  function(
    $stateProvider
  ) {
    $stateProvider
    .state('backend', {
      abstract: true,
      url: '/b',
      template: '<ui-view class="backend"/>',
      data: {
        requireLogin: true
      }
    });
  }
]);
