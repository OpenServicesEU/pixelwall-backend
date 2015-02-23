angular.module('PixelWall')
.controller('BackendBoxesController', [
  '$scope',
  '$modal',
  'boxFactory',
  'page',
  'boxes',
  function (
    $scope,
    $modal,
    boxFactory,
    page,
    boxes
  ) {
    $scope.page = page;
    $scope.boxes = boxes;
    $scope.types = {
      html: "HTML",
      iframe: "IFrame",
      video: "Video",
      images: "Images",
      calendar: "Calendar"
    };
    $scope.addBox = function(type) {
      var box = new boxFactory(
        {
          type: type,
          width: 1,
          height: 1,
          page: $scope.page.id,
          data: {}
        }
      );
      var modalInstance = $modal.open({
        templateUrl: 'assets/templates/pixelwall/modals/box.add.html',
        controller: [
          '$scope',
          '$sce',
          function(
            $scope,
            $sce
          ) {
            $scope.box = box;
            $scope.editable = box.data;
            $scope.form = 'assets/templates/pixelwall/forms/' + box.type + '.html';
            $scope.removeVideo = function(video) {
              if (box.data.video === video) {
                box.data.video = undefined;
              }
            };
            $scope.removeImage = function($index) {
              box.data.images.splice($index, 1);
            };
            $scope.$watch('box.data', function (newVal) {
              console.log("Watcher: ", newVal);
            });
          }
        ],
      });

      modalInstance.result.then(function () {
        console.log(box);
        box.$save(function(box) {
          $scope.boxes.push(box);
        })
      });
    };
  }
]);
