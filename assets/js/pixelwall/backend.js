angular.module(
    'PixelWallBackEnd',
    [
        'PixelWallCommon'
    ]
)
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
                templateUrl: 'assets/templates/pixelwall/backend/modals/device.delete.html',
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
                templateUrl: 'assets/templates/pixelwall/backend/modals/page.delete.html',
                controller: [
                    '$scope',
                    function(
                        $scope
                    ) {
                        $scope.page = pages[$index];
                    }
                ]
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
                templateUrl: 'assets/templates/pixelwall/backend/modals/box.add.html',
                controller: [
                    '$scope',
                    '$sce',
                    function(
                        $scope,
                        $sce
                    ) {
                        $scope.box = box;
                        $scope.editable = box.data;
                        $scope.form = 'assets/templates/pixelwall/backend/forms/' + box.type + '.html';
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
])
.controller('OverlayBoxController', [
    '$scope',
    '$modal',
    function (
        $scope,
        $modal
    ){
        $scope.editBox = function(box) {
            var editable = angular.copy(box.data);
            console.log("Editable: ", editable);
            var modalInstance = $modal.open({
                templateUrl: 'assets/templates/pixelwall/backend/modals/box.edit.html',
                controller: [
                    '$scope',
                    function(
                        $scope
                    ) {
                        $scope.box = box;
                        $scope.editable = editable;
                        $scope.form = 'assets/templates/pixelwall/backend/forms/' + box.type + '.html';
                        $scope.removeVideo = function(video) {
                            if (editable.video === video) {
                                editable.video = undefined;
                            }
                        };
                        $scope.removeImage = function($index) {
                            editable.images.splice($index, 1);
                        };
                        $scope.imageSortableOptions = {
                            axis: 'y'
                        }
                    }
                ]
            });

            modalInstance.result.then(function () {
                box.data = editable;
                box.$save();
            });
        };
        $scope.removeBox = function(box) {
            var modalInstance = $modal.open({
                templateUrl: 'assets/templates/pixelwall/backend/modals/box.delete.html',
                controller: [
                    '$scope',
                    function(
                        $scope
                    ) {
                        $scope.box = box;
                    }
                ]
            });

            modalInstance.result.then(function () {
                return box.$delete();
            });
        };
    }
])
.config([
    '$stateProvider',
    function(
        $stateProvider
    ) {
        $stateProvider
        .state('devices', {
            url: '/b',
            views: {
                "@": {
                    templateUrl: 'assets/templates/pixelwall/backend/device.html',
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
                    templateUrl: 'assets/templates/pixelwall/backend/pages.html',
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
                    templateUrl: 'assets/templates/pixelwall/backend/boxes.html',
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
        return this;
    }
]);

