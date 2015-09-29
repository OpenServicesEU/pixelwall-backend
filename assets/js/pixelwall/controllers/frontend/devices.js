angular.module('PixelWall')
.controller('FrontendDevicesController', [
  '$scope',
  '$state',
  'lodash',
  'devices',
  'pagesets',
  function (
    $scope,
    $state,
    lodash,
    devices,
    pagesets
  ) {
    $scope.$state = $state;
    $scope.devices = devices;
    $scope.pagesets = pagesets;
    $scope.namePageset = function(id) {
      return lodash.result(lodash.find($scope.pagesets, {id: id}), 'name');
    };
    $scope.gridsterOptions = {
      columns: 8,
      outerMargin: false,
      defaultSizeX: 2,
      defaultSizeY: 1,
      draggable: {
        enabled: false
      },
      resizable: {
        enabled: false
      }
    };
  }
]);
