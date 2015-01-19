angular.module(
    'PixelWallBackEnd',
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
        'ui.sortable',
        'xeditable'
    ]
)
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
.controller('DeviceController', [
    '$scope',
    '$modal',
    'deviceFactory',
    'devices',
    function (
        $scope,
        $modal,
        deviceFactory,
        devices
    ) {
        $scope.devices = devices;
        $scope.addDevice = function() {
            $scope.inserted = new deviceFactory({
                name: '',
                active: false
            });
            $scope.devices.push($scope.inserted);
        };
        $scope.saveDevice = function($index, $data) {
            angular.extend($scope.devices[$index], $data);
            return $scope.devices[$index].$save();
        }
        $scope.removeDevice = function($index) {
            var modalInstance = $modal.open({
                template: JST['assets/templates/pixelwall/backend/modals/device.delete.html'],
                controller: ['$scope', 'device', function($scope, device) {
                    $scope.device = device;
                }],
                resolve: {
                    device: function () {
                        return $scope.devices[$index];
                    }
                }
            });

            modalInstance.result.then(function () {
                return $scope.devices[$index].$delete();
            });
        }
    }
])
.controller('PageController', [
    '$scope',
    '$modal',
    'pageFactory',
    'device',
    'pages',
    'allPages',
    function (
        $scope,
        $modal,
        pageFactory,
        device,
        pages,
        allPages
    ) {
        $scope.device = device;
        $scope.pages = pages;
        $scope.allPages = allPages;
        $scope.sortableOptions = {
            orderChanged: function(event) {
                console.log("orderChanged", event);
            }
        };
        $scope.addPage = function(page) {
            if (page) {
                page.devices.push($scope.device.id);
                page.$save();
            } else {
                page = new pageFactory({
                    name: '',
                    rows: 1,
                    columns: 1,
                    duration: 60,
                    devices: [$scope.device.id]
                });
                $scope.inserted = page;
            }
            $scope.pages.push(page);
        };
        $scope.addExistingPage = function() {
            var modalInstance = $modal.open({
                template: '<div>Bla</div>',
                controller: 'ModalInstanceCtrl',
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });

        };
        $scope.savePage = function($index, $data) {
            angular.extend($scope.pages[$index], $data);
            return $scope.pages[$index].$save();
        }
        $scope.removePage = function($index) {
            var modalInstance = $modal.open({
                template: JST['assets/templates/pixelwall/backend/modals/page.delete.html'],
                controller: ['$scope', 'page', function($scope, page) {
                    $scope.page = page;
                }],
                resolve: {
                    page: function () {
                        return $scope.pages[$index];
                    }
                }
            });

            modalInstance.result.then(function () {
                return $scope.pages[$index].$delete();
            });
        }
    }
])
.controller('BoxController', [
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
        $scope.boxTypes = [
            'html',
            'iframe',
            'video',
            'gallery'
        ];
        
        $scope.addBox = function(type) {
            var box = new boxFactory({name: "bla", width: 1, height: 1, type: type, page: $scope.page.id});
            $scope.boxes.push(box);
            box.$save();
        };
    }
])
.controller('OverlayBoxController', [
    '$scope',
    '$modal',
    function (
        $scope,
        $modal
    ){
        $scope.editBox = function(box) {
            var modalInstance = $modal.open({
                template: JST['assets/templates/pixelwall/backend/modals/box.edit.html'],
                controller: ['$scope', 'box', function($scope, page) {
                    $scope.box = box;
                }],
                resolve: {
                    box: function () {
                        return box;
                    }
                }
            });

            modalInstance.result.then(function () {
                box.$save();
            });
        };
        $scope.removeBox = function(box) {
            var modalInstance = $modal.open({
                template: JST['assets/templates/pixelwall/backend/modals/box.delete.html'],
                controller: ['$scope', 'box', function($scope, page) {
                    $scope.box = box;
                }],
                resolve: {
                    box: function () {
                        return box;
                    }
                }
            });

            modalInstance.result.then(function () {
                return box.$delete();
            });
        };
    }
])
.directive('bounce',
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
                    $timeout(function() {
                        var current = 0;
                        var start = 0;
                        var direction = 1;
                        if ($element.prop('scrollTopMax') > 0) {
                            var scroller = $interval(function() {
                                var duration = $element.prop('scrollTopMax');
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
.directive('grid', [
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
            transclude: true,
            template: JST['assets/templates/pixelwall/grid.html'],
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
.directive('box', [
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
                var html = '<box-' + scope.box.type + '/>';
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
.directive('boxHtml', [
    '$compile',
    function($compile) {
        return {
            restrict: 'E',
            replace: true,
            template: JST['assets/templates/pixelwall/box/html.html']
            //link: function (scope, elements, attrs) {
            //    var e = angular.element(scope.box.data.html || '<div>No HTML content for box!</div>');
            //    elements.replaceWith(e);
            //    $compile(e)(scope);
            //}
        };
    }
])
.directive('boxIframe', [
    '$compile',
    function($compile) {
        return {
            restrict: 'E',
            replace: true,
            template: JST['assets/templates/pixelwall/box/iframe.html']
        };
    }
])
.directive('boxVideo', [
    '$compile',
    function($compile) {
        return {
            restrict: 'E',
            replace: true,
            template: JST['assets/templates/pixelwall/box/video.html'],
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
                    $element.on('canplay', function() {
                        console.log("Removing default page timeout!");
                        $timeout.cancel($scope._timeout);
                    });
                    $element.on('ended', function() {
                        console.log("Video ended, resolving defer!");
                        $scope.box._defer.resolve();
                    })

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
    '$stateProvider',
    '$locationProvider',
    function(
        $stateProvider,
        $locationProvider
    ) {
        $stateProvider
        .state('devices', {
            url: '/b',
            views: {
                "@": {
                    template: JST['assets/templates/pixelwall/backend/device.html'],
                    controller: 'DeviceController',
                    resolve: {
                        devices: [
                            'deviceFactory',
                            function(
                                deviceFactory
                            ) {
                                return deviceFactory.query().$promise;
                            }
                        ]
                    }
                }
            }
        })
        .state('devices.pages', {
            url: "/{deviceId:[0-9a-f]+}",
            views: {
                "@": {
                    template: JST['assets/templates/pixelwall/backend/pages.html'],
                    controller: 'PageController',
                    resolve: {
                        device: [
                            '$stateParams',
                            'deviceFactory',
                            function(
                                $stateParams,
                                deviceFactory
                            ) {
                                return deviceFactory.get({id: $stateParams.deviceId}).$promise;
                            }
                        ],
                        pages: [
                            '$stateParams',
                            'pageFactory',
                            function(
                                $stateParams,
                                pageFactory
                            ) {
                                return pageFactory.query({devices: $stateParams.deviceId}).$promise;
                            }
                        ],
                        allPages: [
                            'pageFactory',
                            function(
                                pageFactory
                            ) {
                                return pageFactory.query().$promise;
                            }
                        ]
                    }
                }
            }
        })
        .state('devices.pages.boxes', {
            url: "/{pageId:[0-9a-f]+}",
            views: {
                "@": {
                    template: JST['assets/templates/pixelwall/backend/boxes.html'],
                    controller: 'BoxController',
                    resolve: {
                        page: [
                            '$stateParams',
                            'pageFactory',
                            function(
                                $stateParams,
                                pageFactory
                            ) {
                                return pageFactory.get({id: $stateParams.pageId}).$promise;
                            }
                        ],
                        boxes: [
                            '$stateParams',
                            'boxFactory',
                            function(
                                $stateParams,
                                boxFactory
                            ) {
                                return boxFactory.query({page: $stateParams.pageId}).$promise;
                            }
                        ]
                    }
                }
            }
        });
        $locationProvider.html5Mode(true);
    }
]);

