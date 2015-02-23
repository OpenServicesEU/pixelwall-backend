angular.module('PixelWall')
.controller('BackendDevicesController', [
  '$scope',
  '$modal',
  'deviceFactory',
  'devices',
  function (
    $scope,
    $modal,
    deviceFactory,
    devices
  ) {
    $scope.devices = devices;
    $scope.addDevice = function() {
      $scope.inserted = new deviceFactory({
        name: '',
        active: false
      });
      $scope.devices.push($scope.inserted);
    };
    $scope.saveDevice = function($index, $data) {
      angular.extend($scope.devices[$index], $data);
      return $scope.devices[$index].$save();
    }
    $scope.removeDevice = function($index) {
      var modalInstance = $modal.open({
        templateUrl: 'assets/templates/pixelwall/modals/device.delete.html',
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
            return $scope.devices[$index];
          }
        }
      });

      modalInstance.result.then(function () {
        return $scope.devices[$index].$delete();
      });
    }
  }
]);
