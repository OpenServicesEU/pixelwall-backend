angular.module('PixelWall')
.directive('pwBoxWeather', [
  '$compile',
  function($compile) {
    return {
      restrict: 'E',
      templateUrl: 'pixelwall/directives/box/weather.html',
      controller: [
        '$scope',
        'openweathermap',
        function (
          $scope,
          openweathermap
        ) {
          openweathermap[$scope.box.data.scope]
          .name($scope.box.data.city)
          .then(function(weather) {
            $scope.weather = weather;
          });
        }
      ]
    };
  }
]);
