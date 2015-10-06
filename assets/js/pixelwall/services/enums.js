angular.module('PixelWall')
.service(
  'enums',
  [
    'lodash',
    function(
      lodash
    ) {
      var tiles = {
        'BasemapAT.highdpi': 'Basemap.at (HighDPI)',
        'BasemapAT.orthofoto': 'Basemap.at (Orthofoto)',
        'CartoDB.Positron': 'CartoDB (Positron)',
        'OpenWeatherMap.Clouds': 'OpenWeatherMap (Clouds)',
        'OpenWeatherMap.Precipitation': 'OpenWeatherMap (Precipitation)',
        'OpenWeatherMap.Rain': 'OpenWeatherMap (Rain)',
        'OpenWeatherMap.Pressure': 'OpenWeatherMap (Pressure)',
        'OpenWeatherMap.Wind': 'OpenWeatherMap (Wind)',
        'OpenWeatherMap.Temperature': 'OpenWeatherMap (Temperature)',
        'OpenWeatherMap.Snow': 'OpenWeatherMap (Snow)'
      };
      return {
        box: {
          types: {
            'html': {
              label: 'HTML',
              icon: 'code',
              controller: 'HtmlFormController'
            },
            'iframe': {
              label: 'IFrame',
              icon: 'file-code-o',
              controller: 'IframeFormController'
            },
            'video': {
              label: 'Video',
              icon: 'file-video-o',
              controller: 'VideoFormController'
            },
            'video-stream': {
              label: 'Videostream',
              icon: 'video-camera',
              controller: 'VideoStreamFormController'
            },
            'images': {
              label: 'Images',
              icon: 'photo',
              controller: 'ImagesFormController'
            },
            'calendar': {
              label: "Calendar",
              icon: 'calendar-o',
              controller: 'CalendarFormController'
            },
            'map': {
              label: 'Map',
              icon: 'globe',
              controller: 'MapFormController'
            },
            'clock-analog': {
              label: 'Clock (analog)',
              icon: 'clock-o',
              controller: 'ClockAnalogFormController'
            },
            'clock-digital': {
              label: 'Clock (digital)',
              icon: 'caret-square-o-right',
              controller: 'ClockDigitalFormController'
            },
            'weather': {
              label: 'Weather',
              icon: 'sun-o',
              controller: 'WeatherFormController'
            }
          },
          map: {
            tiles: lodash.mapValues(
              tiles,
              function(value, key) {
                var provider = L.tileLayer.provider(key);
                return {
                  name: value,
                  url: provider._url,
                  options: provider.options
                };
              }
            )
          }
        }
      };
    }
  ]
);
