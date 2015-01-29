angular.module(
    'PixelWallCommon',
    [
        'angularFileUpload',
        'gridster',
        'mgo-angular-wizard',
        'ngAnimate',
        'ngQuill',
        'picardy.fontawesome',
        'sailsResource',
        'ui.bootstrap',
        'ui.router',
        'angular-sortable-view',
        'xeditable',
        'ui.bootstrap-slider'
    ]
)
.factory('bridgeFactory', function() {
  return {
    listen: function(bridge, signal, callback) {
      if (window.hasOwnProperty(bridge)) {
        window[bridge]['on_' + signal].connect(callback);
      }
    },
    send: function(bridge, slot, data) {
      if (window.hasOwnProperty(bridge)) {
        window[bridge][slot](JSON.stringify(data));
      }
    }
  };
})
.factory('deviceFactory', [
    'sailsResource',
    function(sailsResource) {
        return sailsResource('device', {}, {verbose: true});
    }
])
.factory('pageFactory', [
    'sailsResource',
    function(sailsResource) {
        return sailsResource('page', {}, {verbose: true});
    }
])
.factory('boxFactory', [
    'sailsResource',
    function(sailsResource) {
        return sailsResource('box', {}, {verbose: true});
    }
])
.filter('trustedUrl', ['$sce', function ($sce) {
  return function(url) {
    return $sce.trustAsResourceUrl(url);
  };
}])
.filter('trustedHtml', ['$sce', function ($sce) {
  return function(html) {
    return $sce.trustAsHtml(html);
  };
}])
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
            templateUrl: 'assets/templates/pixelwall/backend/utils/images-upload.html',
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
])
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
            templateUrl: 'assets/templates/pixelwall/backend/utils/video-upload.html',
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
])
.directive('pwEditCalendar', [
    '$compile',
    function ($compile) {
        return {
            restrict: 'E',
            scope: {
                data: '='
            },
            replace: true,
            templateUrl: 'assets/templates/pixelwall/backend/utils/calendar-edit.html',
            controller: [
                '$scope',
                '$element',
                function (
                    $scope,
                    $element) {

                    var loadedUrl = $scope.data.url;

                    $scope.$watch('data.url', function (url) {
                        if (url == loadedUrl)
                            return;

                        loadedUrl = url;

                        io.socket.get('/calendar/parse', { url: url }, function(events) {
                            $scope.data.events = events;
                        });
                    });
                }
            ]
        }
    }
])
.directive('pwCalendarListview', [
    '$compile',
    function ($compile) {
        return {
            restrict: 'E',
            scope: {
                events: '='
            },
            replace: true,
            templateUrl: 'assets/templates/pixelwall/box/calendar-listview.html',
            controller: [
                '$scope',
                '$element',
                function (
                    $scope,
                    $element) {

                    $scope.groupedEvents = [
                    {
                        events: $scope.events
                    }];

                    var groupedEvents = {};
                    
                    $scope.events.forEach(function (event) {
                        //var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                        
                        var start = new Date(event.start);
                        var end = new Date(event.end);
                        
                        var days = end.getDay() - start.getDay() + 1;
                        
                        for (var i = 0; i < days; i++) {
                            var date = new Date(start);
                            date.setDate(start.getDate() + i);
                            var key = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();

                            if (typeof groupedEvents[key] === "undefined")
                                groupedEvents[key] = { date: date, events: [] };

                            groupedEvents[key].events.push(event);
                        }
                    });

                    $scope.groupedEvents = [];
                    for (var property in groupedEvents) {
                        $scope.groupedEvents.push(groupedEvents[property]);
                    }

                    console.log($scope.groupedEvents.length);
                }
            ]
        }
    }
])
.directive('pwBounce',
    function() {
        return {
            controller: [
                '$element',
                '$interval',
                '$timeout',
                '$scope',
                function(
                    $element,
                    $interval,
                    $timeout,
                    $scope
                ) {
                    //$scope.$watch(
                    //    function() {
                    //        console.log($element.prop('scrollTopMax'));
                    //        return $element.prop('scrollTopMax');
                    //    },
                    //    function(newVal, oldVal) {
                    //        console.log(newVal, oldVal);
                    //    }
                    //);
                    $element.addClass("bounce");
                    $timeout(function() {
                        var current = 0;
                        var start = 0;
                        var direction = 1;
                        if ($element.prop('scrollHeight') > $element.prop('clientHeight')) {
                            var scroller = $interval(function() {
                                var duration = $element.prop('scrollHeight') - $element.prop('clientHeight');
                                var change = duration * direction;
                                //var pos = sinease(current, start, change, duration);
                                var pos = -change / 2 * (Math.cos(Math.PI * current / duration) - 1) + start;
                                current = current + 1;
                                // Set the current position.
                                $element.prop('scrollTop', pos);
                                // See if we went through a full circle.
                                if (current >= duration) {
                                    // Reverse direction of scroll.
                                    start = start + (duration * direction);
                                    direction = direction * -1;
                                    current = 0;
                                }
                            }, 40);
                        }
                    }, 1000);
                }
            ]
        };
    }
)
.directive('pwCarousel',
    function() {
        return {
            restrict: 'E',
            scope: {
                images: '=',
                interval: '=',
                start: '=',
                end: '=',
                current: '='
            },
            templateUrl: 'assets/templates/pixelwall/carousel.html',
            controller: [
                '$element',
                '$interval',
                '$scope',
                function(
                    $element,
                    $interval,
                    $scope
                ) {
                    $scope.index = 0; // Initially the index is at the first image
                    $scope.active = function($index) {
                        return $index == $scope.index;
                    };
                    $scope.next = function() {
                      $scope.index < $scope.images.length - 1 ? $scope.index++ : $scope.index = 0;
                    };
                    $scope.prev = function() {
                      $scope.index > 0 ? $scope.index-- : $scope.index = $scope.images.length - 1;
                    };
                    var interval;
                    $scope.reset = function(time) {
                      if (typeof interval !== 'undefined') {
                        $interval.cancel(interval);
                      }
                      interval = $interval(function() {
                        if ($scope.index === $scope.images.length - 1) {
                          if (typeof $scope.end === 'function') {
                            $scope.end();
                          }
                        }
                        $scope.next();
                        if ($scope.index === 0) {
                          if (typeof $scope.start === 'function') {
                            $scope.start();
                          }
                        }
                      }, time);
                    };
                    $scope.$watch('index', function(newVal) {
                      $scope.images.forEach(function(image) {
                          image.visible = false; // make every image invisible
                        });
                      $scope.images[newVal].visible = true; // make the current image visible
                    });
                    $scope.$watch('interval', function(newVal) {
                      $scope.reset(newVal);
                    });
                    $scope.$on(
                      "$destroy",
                      function() {
                        $interval.cancel(interval);
                      }
                    );
                }
            ]
        };
    }
)
.directive('pwGrid', [
    '$compile',
    function($compile) {
        return {
            restrict: 'E',
            scope: {
                rows: '=',
                columns: '=',
                timeout: '=',
                boxes: '='
            },
            templateUrl: 'assets/templates/pixelwall/grid.html',
            controller: [
                '$scope',
                '$element',
                function($scope, $element) {
                    $scope.gridsterOpts = {
                        columns: $scope.columns,
                        minColumns: $scope.columns,
                        minRows: $scope.rows,
                        maxRows: $scope.rows,
                        pushing: true,
                        floating: false,
                        swapping: true,
                        width: 'auto',
                        colWidth: 'auto',
                        rowHeight: ($element.parents('[ui-view=""]').height()-10) / $scope.rows,
                        margins: [10, 10],
                        outerMargin: true,
                        isMobile: false,
                        mobileBreakPoint: 600,
                        mobileModeEnabled: true,
                        defaultSizeX: 1,
                        defaultSizeY: 1,
                        resizable: {
                            enabled: true,
                            //handles: 'e, s, w, ne, se, sw, nw',
                            start: function(event, uiWidget, $element) {},
                            resize: function(event, uiWidget, $element) {},
                            stop: function(event, uiWidget, $element) {}
                        },
                        draggable: {
                            enabled: true,
                            handle: '.drag-handle', // optional selector for resize handle
                            start: function(event, uiWidget, $element) {},
                            drag: function(event, uiWidget, $element) {},
                            stop: function(event, uiWidget, $element) {}
                        }
                    };
                }
            ]
        };
    }
])
.directive('pwBox', [
    '$compile',
    function($compile) {
        return {
            restrict: 'E',
            scope: {
                box: '=',
                timeout: '='
            },
            replace: true,
            link: function (scope, elements, attrs) {
                var html = '<pw-box-' + scope.box.type + '/>';
                var e = angular.element(html);
                elements.replaceWith(e);
                $compile(e)(scope);
            },
            controller: [
                '$scope',
                '$element',
                '$attrs',
                '$timeout',
                function (
                    $scope,
                    $element,
                    $attrs,
                    $timeout
                ) {
                    // See if we have a defer on the box that we might need to resolve.
                    if (typeof $scope.box._defer !== 'undefined') {
                        $scope._timeout = $timeout(function() {
                            console.log("Default page timeout finished!");
                            $scope.box._defer.resolve();
                        }, $scope.timeout*1000);
                    }
                    $scope.$watch('box', function(newBox, oldBox) {
                        if (newBox === oldBox) {
                            return;
                        }
                        var changed = ['left', 'top', 'width', 'height'].map(function(property) {
                            return newBox[property] !== oldBox[property];
                        });
                        if (changed.indexOf(true) >= 0) {
                            $scope.box.$save();
                        }
                    }, true);
                }
            ]
        };
    }
])
.directive('pwBoxHtml', [
    '$compile',
    function($compile) {
        return {
            restrict: 'E',
            templateUrl: 'assets/templates/pixelwall/box/html.html'
        };
    }
])
.directive('pwBoxIframe', [
    '$compile',
    function($compile) {
        return {
            restrict: 'E',
            templateUrl: 'assets/templates/pixelwall/box/iframe.html'
        };
    }
])
.directive('pwBoxCalendar', [
    '$compile',
    function ($compile) {
        return {
            restrict: 'E',
            templateUrl: 'assets/templates/pixelwall/box/calendar.html'
        };
    }
])
.directive('pwBoxVideo', [
    '$compile',
    function($compile) {
        return {
            restrict: 'E',
            templateUrl: 'assets/templates/pixelwall/box/video.html',
            controller: [
                '$scope',
                '$element',
                '$attrs',
                '$timeout',
                function (
                    $scope,
                    $element,
                    $attrs,
                    $timeout
                ) {
                    if (typeof $scope._timeout !== 'undefined') {
                      $element.on('canplay', function() {
                          console.log("Removing default page timeout!", $element);
                          $timeout.cancel($scope._timeout);
                      });
                    }
                    if (typeof $scope.box._defer !== 'undefined') {
                      $element.on('ended', function() {
                          console.log("Video ended, resolving defer!", $element);
                          $scope.box._defer.resolve();
                      });
                    }
                }
            ]
        };
    }
])
.directive('pwBoxImages', [
    '$compile',
    function($compile) {
        return {
            restrict: 'E',
            templateUrl: 'assets/templates/pixelwall/box/images.html',
            controller: [
                '$scope',
                '$element',
                '$attrs',
                '$timeout',
                '$interval',
                function (
                    $scope,
                    $element,
                    $attrs,
                    $timeout,
                    $interval
                ) {
                    $scope.images = $scope.box.data.images.map(function(image) {
                      return {
                        src: image
                      };
                    });
                    if (
                      typeof $scope.box.data.images !== 'undefined' &&
                      typeof $scope._timeout !== 'undefined'
                    ) {
                        $timeout.cancel($scope._timeout);
                        var resolver = $timeout(function() {
                            console.log("All slides played!");
                            $scope.box._defer.resolve();
                        }, $scope.box.data.images.length * $scope.box.data.interval * 1000);
                    }
                    $scope.$watch('box.data.interval', function(newVal) {
                      console.log('Interval: ', newVal);
                    });

                }
            ]
        };
    }
])
//.run(['$rootScope', function($rootScope) {
//  $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
//    console.log('$stateChangeStart to '+toState.to+'- fired when the transition begins. toState,toParams : \n',toState, toParams);
//  });
//  $rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams){
//    console.log('$stateChangeError - fired when an error occurs during transition.');
//    console.log(arguments);
//  });
//  $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
//    console.log('$stateChangeSuccess to '+toState.name+'- fired once the state transition is complete.');
//  });
//  // $rootScope.$on('$viewContentLoading',function(event, viewConfig){
//  //   // runs on individual scopes, so putting it in "run" doesn't work.
//  //   console.log('$viewContentLoading - view begins loading - dom not rendered',viewConfig);
//  // });
//  $rootScope.$on('$viewContentLoaded',function(event){
//    console.log('$viewContentLoaded - fired after dom rendered',event);
//  });
//  $rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){
//    console.log('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name.');
//    console.log(unfoundState, fromState, fromParams);
//  });
//}])
.config([
    '$locationProvider',
    '$provide',
    function(
        $locationProvider,
        $provide
    ) {
        $provide.decorator('$templateCache', function($delegate, $sniffer) {
            var originalGet = $delegate.get;

            $delegate.get = function(key) {
                var value;
                value = originalGet(key);
                if (!value) {
                    value = JST[key]();
                    if (value) {
                        $delegate.put(key, value);
                    }
                }
                return value;
            };

            return $delegate;
        });
        $locationProvider.html5Mode(true);
        return this;
    }
]);

