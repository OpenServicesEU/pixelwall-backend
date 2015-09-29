angular.module('PixelWall')
.controller('BackendPagesController', [
  '$scope',
  '$modal',
  'pageFactory',
  'pageset',
  'pages',
  function (
    $scope,
    $modal,
    pageFactory,
    pageset,
    pages
  ) {
    $scope.pageset = pageset;
    $scope.pages = pages;
    $scope.addPage = function() {
      $scope.inserted = new pageFactory({
        set: $scope.pageset.id,
        name: '',
        rows: 10,
        columns: 10,
        duration: 60,
        order: $scope.pages.length
      });
      $scope.pages.push($scope.inserted);
    };
    $scope.savePage = function(page, $data) {
      angular.extend(page, $data);
      if (page == $scope.inserted) {
        $scope.inserted = undefined;
      }
      page.$save();
    };
    $scope.cancelPage = function(page, $index) {
      if (page == $scope.inserted) {
        $scope.pages.splice($index, 1);
        $scope.inserted = undefined;
      }
    };
    $scope.removePage = function(page) {
      var modalInstance = $modal.open({
        templateUrl: 'pixelwall/modals/page.delete.html',
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
        $scope.pages.filter(function(p) {
          return p.id != page.id;
        }).forEach(function(p) {
          if (p.order> page.order) {
            p.order -= 1;
            p.$save();
          }
        });
        page.$delete();
      });
    };
    $scope.sortedPageOptions = {
      orderChanged: function(event) {
        console.log(event);
        event.source.itemScope.page.order = event.dest.index;
        event.source.itemScope.page.$save();
        $scope.pages.filter(function(page) {
          return page.id != event.source.itemScope.page.id;
        }).forEach(function(page) {
          if (page.order >= event.dest.index && page.order < event.source.index) {
            page.order += 1;
            page.$save();
            return;
          }
          if (page.order > event.source.index && page.order <= event.dest.index) {
            page.order -= 1;
            page.$save();
            return;
          }
        });
      }
    };
  }
]);
