angular.module('PixelWall')
.controller('PdfFormController', [
  '$scope',
  'box',
  'editable',
  function (
    $scope,
    box,
    editable
  ) {
    $scope.box = box;
    $scope.editable = editable;
    $scope.form = 'assets/templates/pixelwall/forms/pdf.html';
    $scope.removePdf = function(pdf) {
      if (box.data.pdf === pdf) {
        box.data.pdf = undefined;
      }
    };
  }
]);

