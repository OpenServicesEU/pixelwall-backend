angular.module('PixelWall')
.service('boxTypes', function() {
  var types = {
    html: {
      label: 'HTML',
      icon: 'code',
      controller: 'HtmlFormController'
    },
    iframe: {
      label: 'IFrame',
      icon: 'file-code-o',
      controller: 'IframeFormController'
    },
    video: {
      label: 'Video',
      icon: 'video-camera',
      controller: 'VideoFormController'
    },
    images: {
      label: 'Images',
      icon: 'photo',
      controller: 'ImagesFormController'
    },
    calendar: {
      label: "Calendar",
      icon: 'calendar-o',
      controller: 'CalendarFormController'
    },
    map: {
      label: 'Map',
      icon: 'globe',
      controller: 'MapFormController'
    }
  };
  return types;
});
