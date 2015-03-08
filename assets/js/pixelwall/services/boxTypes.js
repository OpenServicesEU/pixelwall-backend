angular.module('PixelWall')
.service('boxTypes', function() {
  var types = {
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
    }
  };
  return types;
});
