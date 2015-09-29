angular.module('PixelWall')
.controller('BackendPagesetsController', [
  '$scope',
  '$modal',
  'pagesetFactory',
  'pagesets',
  function (
    $scope,
    $modal,
    pagesetFactory,
    pagesets
  ) {
    $scope.pagesets = pagesets;
    $scope.addPageset = function() {
      $scope.inserted = new pagesetFactory({
        name: '',
        active: false
      });
      $scope.pagesets.push($scope.inserted);
    };
    $scope.savePageset = function(pageset, $data) {
      angular.extend(pageset, $data);
      if (pageset == $scope.inserted) {
        $scope.inserted = undefined;
      }
      return pageset.$save();
    };
    $scope.cancelPageset = function(pageset, $index) {
      if (pageset == $scope.inserted) {
        $scope.pagesets.splice($index, 1);
        $scope.inserted = undefined;
      }
    };
    $scope.removePageset = function(pageset) {
      var modalInstance = $modal.open({
        templateUrl: 'pixelwall/modals/pageset.delete.html',
        controller: [
          '$scope',
          'pageset',
          'devices',
          'pages',
          function(
            $scope,
            pageset,
            devices,
            pages
          ) {
            $scope.pageset = pageset;
            $scope.devices = devices;
            $scope.pages = pages;
          }
        ],
        resolve: {
          pageset: [
            function () {
              return pageset;
            }
          ],
          devices: [
            'deviceFactory',
            function(deviceFactory) {
              return deviceFactory.query({set: pageset.id}).$promise;
            }
          ],
          pages: [
            'pageFactory',
            function(pageFactory) {
              return pageFactory.query({set: pageset.id}).$promise;
            }
          ]
        }
      });
      modalInstance.result.then(function () {
        return pageset.$delete();
      });
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
