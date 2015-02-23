angular.module('PixelWall')
.config([
  '$stateProvider',
  function(
      $stateProvider
  ) {
    $stateProvider
    .state('frontend', {
      abstract: true,
      template: '<ui-view/>'
    });
  }
]);
