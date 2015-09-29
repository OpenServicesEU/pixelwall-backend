angular.module('PixelWall')
.config([
  '$stateProvider',
  function(
      $stateProvider
  ) {
    $stateProvider
    .state('frontend', {
      abstract: true,
      url: '/d',
      template: '<ui-view class="frontend"/>'
    });
  }
]);
