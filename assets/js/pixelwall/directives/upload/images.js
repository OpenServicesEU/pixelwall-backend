angular.module('PixelWall')
.directive('pwUploadImages', [
    '$compile',
    function($compile) {
        return {
            restrict: 'E',
            scope: {
                url: '=',
                data: '='
            },
            replace: true,
            templateUrl: 'assets/templates/pixelwall/directives/upload/images.html',
            controller: [
                '$scope',
                '$element',
                '$upload',
                function(
                    $scope,
                    $element,
                    $upload
                ) {
                    console.log('Images data:', $scope.data);
                    $scope.$watch('uploads', function(images) {
                        if (typeof images === 'undefined') {
                            return;
                        }
                        $upload.upload({
                            url: $scope.url,
                            file: images,
                            fileFormDataName: 'images'

                        }).progress(function(evt) {
                            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                        }).success(function(data, status, headers, config) {
                            console.log('Response images: ', data);
                            $scope.uploading = false;
                            if (typeof $scope.data === 'undefined') {
                                $scope.data = data.files;
                            } else {
                                $scope.data = $scope.data.concat(data.files);
                            }
                        });
                    });
                }
            ]
        }
    }
]);
