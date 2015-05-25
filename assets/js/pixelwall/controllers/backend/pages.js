angular.module('PixelWall')
.controller('BackendPagesController', [
  '$scope',
  '$modal',
  'pageFactory',
  'device',
  'pages',
  'allPages',
  function (
    $scope,
    $modal,
    pageFactory,
    device,
    pages,
    allPages
  ) {
    $scope.device = device;
    $scope.pages = pages;
    $scope.pageOrder = function(page) {
      return page.ordering[$scope.device.id];
    };
    $scope.allPages = allPages;
    $scope.addExistingPage = function(page) {
      page.devices.push($scope.device.id);
      page.ordering[$scope.device.id] = $scope.pages.length;
      page.$save(function(p) {
        $scope.pages.push(p);
      });
    };
    $scope.addNewPage = function() {
      var ordering = {};
      ordering[$scope.device.id] = $scope.pages.length;
      $scope.inserted = new pageFactory({
        name: '',
        rows: 1,
        columns: 1,
        duration: 60,
        devices: [$scope.device.id],
        ordering: ordering
      });
      $scope.pages.push($scope.inserted);
    };
    $scope.savePage = function(page, $data) {
      angular.extend(page, $data);
      page.$save();
    };
    $scope.removePage = function(page) {
      var modalInstance = $modal.open({
        templateUrl: 'assets/templates/pixelwall/modals/page.delete.html',
        controller: [
          '$scope',
          function(
            $scope
          ) {
            $scope.page = page;
          }
        ]
      });

      modalInstance.result.then(function() {
        page.$delete();
      });
    };
    $scope.movePage = function($item, $partFrom, $partTo, $indexFrom, $indexTo) {
      $scope.pages.forEach(function(page) {
        if (page.ordering[$scope.device.id] == $indexFrom) {
          page.ordering[$scope.device.id] = $indexTo;
        } else {
          if ($indexTo < $indexFrom) {
            if (page.ordering[$scope.device.id] >= $indexTo && page.ordering[$scope.device.id] < $indexFrom) {
              page.ordering[$scope.device.id] += 1;
            }
          } else {
            if (page.ordering[$scope.device.id] > $indexFrom && page.ordering[$scope.device.id] <= $indexTo) {
              page.ordering[$scope.device.id] -= 1;
            }
          }
        }
        page.$save();
      });
    };
  }
]);
