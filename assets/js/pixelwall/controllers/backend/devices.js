angular.module('PixelWall')
.controller('BackendDevicesController', [
  '$scope',
  '$modal',
  'lodash',
  'deviceFactory',
  'pagesetFactory',
  'devices',
  'pagesets',
  function (
    $scope,
    $modal,
    lodash,
    deviceFactory,
    pagesetFactory,
    devices,
    pagesets
  ) {
    $scope.devices = devices;
    $scope.pagesets = pagesets;
    $scope.addDevice = function() {
      $scope.inserted = new deviceFactory({
        name: '',
        active: false
      });
      $scope.devices.push($scope.inserted);
    };
    $scope.saveDevice = function(device, $data) {
      angular.extend(device, $data);
      if (device == $scope.inserted) {
        $scope.inserted = undefined;
      }
      return device.$save();
    };
    $scope.cancelDevice = function(device, $index) {
      if (device == $scope.inserted) {
        $scope.devices.splice($index, 1);
        $scope.inserted = undefined;
      }
    };
    $scope.toggleDevice = function(device) {
      device.active = !device.active;
      device.$save();
    };
    $scope.removeDevice = function(device) {
      var modalInstance = $modal.open({
        templateUrl: 'pixelwall/modals/device.delete.html',
        controller: [
          '$scope',
          'device',
          function(
            $scope,
            device
          ) {
            $scope.device = device;
          }
        ],
        resolve: {
          device: function () {
            return device;
          }
        }
      });
      modalInstance.result.then(function () {
        return device.$delete();
      });
    };
    $scope.loadPagesets = function() {
      var pagesets = pagesetFactory.query();
      return pagesets.$promise.then(function(data) {
        $scope.pagesets = data;
        return data;
      });
    };
    $scope.namePageset = function(id) {
      return lodash.result(lodash.find($scope.pagesets, {id: id}), 'name');
    };
    $scope.gridsterOptions = {
      columns: 8,
      outerMargin: true,
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
