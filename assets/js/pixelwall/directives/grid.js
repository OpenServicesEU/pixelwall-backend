angular.module('PixelWall')
.directive('pwGrid', [
    '$compile',
    function($compile) {
        return {
            restrict: 'E',
            scope: {
                rows: '=',
                columns: '=',
                timeout: '=',
                boxes: '=',
                editable: '='
            },
            templateUrl: 'pixelwall/directives/grid.html',
            controller: [
                '$scope',
                '$element',
                '$attrs',
                function(
                    $scope,
                    $element,
                    $attrs
                ) {
                    //$scope.editable = !angular.isUndefined($attrs.editable);
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
                            enabled: $scope.editable,
                            //handles: 'e, s, w, ne, se, sw, nw',
                            start: function(event, uiWidget, $element) {
                            },
                            resize: function(event, uiWidget, $element) {
                            },
                            stop: function(event, uiWidget, $element) {
                            }
                        },
                        draggable: {
                            enabled: $scope.editable,
                            handle: '.drag-handle',
                            start: function(event, uiWidget, $element) {
                            },
                            drag: function(event, uiWidget, $element) {
                            },
                            stop: function(event, uiWidget, $element) {
                            }
                        }
                    };
                }
            ]
        };
    }
]);
