angular.module('PixelWall')
.directive('pwUploadVideo', [
    '$compile',
    function($compile) {
        return {
            restrict: 'E',
            scope: {
                url: '=',
                data: '='
            },
            replace: true,
            templateUrl: 'assets/templates/pixelwall/directives/upload/video.html',
            controller: [
                '$scope',
                '$element',
                '$upload',
                function(
                    $scope,
                    $element,
                    $upload
                ) {
                    $scope.uploading = false;
                    $scope.progress = 0;
                    $scope.$watch('uploads', function(video) {
                        if (typeof video === 'undefined') {
                            return;
                        }
                        $scope.progress = 0;
                        $scope.uploading = true;
                        $scope.upload = $upload.upload({
                            url: $scope.url,
                            file: video,
                            fileFormDataName: 'video'
                        }).progress(function(evt) {
                            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                        }).success(function(data, status, headers, config) {
                            $scope.uploading = false;
                            $scope.data = data.files.pop();
                        });
                    });
                }
            ]
        }
    }
]);
