angular.module('PixelWall')
.config([
  '$stateProvider',
  function(
    $stateProvider
  ) {
    $stateProvider
    .state('backend.users', {
      url: '/users',
      data: {
        roles: ['Admin']
      },
      templateUrl: 'pixelwall/states/backend/users.html',
      controller: 'BackendUsersController',
      resolve: {
        users: [
          'userFactory',
          function(
            userFactory
          ) {
            return userFactory.query({populate: 'auth'}).$promise;
          }
        ],
        groups: [
          'groupFactory',
          function(
            groupFactory
          ) {
            return groupFactory.query().$promise;
          }
        ]
      }
    })
  }
]);
